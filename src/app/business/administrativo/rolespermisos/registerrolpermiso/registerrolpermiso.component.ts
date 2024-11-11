import { Component } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registerrolpermiso',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './registerrolpermiso.component.html',
  styleUrl: './registerrolpermiso.component.css'
})
export default class RegisterrolpermisoComponent {

  formData: any = {
    nombreRol: '',
    permisos: [] as number[]
  };

  errorMessage = '';
  permisos: any[] = [];

  constructor(
    private readonly userService: AuthService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.loadPermisos();
  }

  async loadPermisos() {
    try {
      const token: any = localStorage.getItem('authToken');//token
      const response = await this.userService.getAllPermisos(token);
      //console.log('RESPONSE: ', response);
      
      if (response) {
        this.permisos = response.map((permiso: { id: number, nombre: string }) => ({ ...permiso, seleccionado: false }));
      } else {
        this.showError('No se encontraron permisos.');
      }
    } catch (error: any) {
      this.showError(error.message);
    }
  }

  async handleSubmit() {

    // Check if all fields are not empty
    if (!this.formData.nombreRol) {
      this.showError('Por favor, rellene todos los campos obligatorios *.');
      return;
    }

    // Confirm registration with user
    const confirmRegistration = confirm('Estas seguro que desea crear este rol?');
    if (!confirmRegistration) {
      return;
    }

    try {
      const token = localStorage.getItem('authToken');//token
      if (!token) {
        throw new Error('No se ha encontrado ningún token');
      }

      // Filtrar los permisos seleccionados y mapearlos a string
      const permisosSeleccionados = this.permisos.filter(permiso => permiso.seleccionado);
      this.formData.permisos = permisosSeleccionados.map(permiso => permiso.id.toString());
  
      // Verifica la estructura del formData antes de enviarlo
      //console.log('formData antes de enviarlo:', this.formData);

      const response = await this.userService.registerRol({
        nombre: this.formData.nombreRol,
        permissions: this.formData.permisos
      }, token);
      //console.log('Resp: ', response);
      

      
      //if (response.statusCode === 200) {
      if (response) {
        this.router.navigate(['/rolespermisos']);
      } else {
        this.showError(response.message);
      }
    } catch (error: any) {
      this.showError(error.message);
    }
  }

  showError(message: string) {
    this.errorMessage = message;
    setTimeout(() => {
      this.errorMessage = ''; // Clear the error message after the specified duration
    }, 3000);
  }

  toggleEspecialidad(id: number) {
    const index = this.permisos.findIndex(permiso => permiso.id === id);
    if (index !== -1) {
      this.permisos[index].seleccionado = !this.permisos[index].seleccionado;
    }
  }

}
