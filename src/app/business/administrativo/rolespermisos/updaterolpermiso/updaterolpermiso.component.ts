import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-updaterolpermiso',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './updaterolpermiso.component.html',
  styleUrl: './updaterolpermiso.component.css'
})
export default class UpdaterolpermisoComponent implements OnInit{

  formData = {
    nombre: '',
    permissions: [] as string[]
  };

  errorMessage: string = '';
  permissions: any[] = [];

  rolId: string = '';

  constructor(
    private readonly userService: AuthService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.loadpermissions();
    this.loadRolDetails();
  }

  async loadpermissions() {
    try {
      const token: any = localStorage.getItem('authToken');//token
      const response = await this.userService.getAllPermisos(token);
      //console.log('RESPONSE: ', response);
      
      if (response) {
        this.permissions = response.map((permiso: { id: number, nombre: string }) => ({ ...permiso, seleccionado: false }));
        //console.log('RESPONSE2: ', this.permissions);
      } else {
        this.showError('No se encontraron permissions.');
      }
    } catch (error: any) {
      this.showError(error.message);
    }
  }

  async loadRolDetails() {
    try {
      const token: any = localStorage.getItem('authToken');//token
      const roleId = this.route.snapshot.paramMap.get('id');
      if (roleId) {
        this.rolId = roleId;
        const response = await this.userService.getRolById(this.rolId, token);
        console.log('Rol Details:', response); // Log medico details
        if (response) {
          
          this.formData.nombre = response.nombre || '';

          const rolepermissions = response.permissions.map((permiso: { id: string }) => permiso.id);
          console.log('Rol Details22:', rolepermissions);
          this.permissions.forEach(permiso => {
            permiso.seleccionado = rolepermissions.includes(permiso.id);
          });
        } else {
          this.showError('No se encontraron detalles del rol.');
        }
      } else {
        this.showError('No se proporcionó un ID de rol.');
      }
    } catch (error: any) {
      this.showError(error.message);
    }
  }

  async handleSubmit() {

    // Check if all fields are not empty
    if (!this.formData.nombre ) {
      this.showError('Por favor, rellene todos los campos obligatorios *.');
      return;
    }

    // Confirmar actualización con el usuario
    const confirmRegistration = confirm('Está seguro de que desea actualizar a este rol?');
    if (!confirmRegistration) {
      return;
    }

    try {
      const token = localStorage.getItem('authToken');//token
      if (!token) {
        throw new Error('No se ha encontrado ningún token');
      }

      // Filtrar los permissions seleccionados
      const permissionsSeleccionados = this.permissions.filter(permiso => permiso.seleccionado);
      this.formData.permissions = permissionsSeleccionados.map(permiso => permiso.id.toString());//permiso.id (OJO)
  
      // Verifica la estructura del formData antes de enviarlo
      //console.log('formData antes de enviarlo:', this.formData);
      console.log('Updating Role:', this.rolId, this.formData); // Log update data

      const response = await this.userService.updateRol(this.rolId, this.formData, token);
      //console.log('Resp: ', response);
      console.log('Update Response:', response);

      
      //if (response.statusCode === 200) {
      if (response) {
        this.router.navigate(['/rolespermisos']);
      } else {
        this.showError('Error al actualizar el rol.');
      }
    } catch (error: any) {
      console.error('Update Error:', error); // Log error
      this.showError(error.message);
    }
  }

  showError(message: string) {
    this.errorMessage = message;
    setTimeout(() => {
      this.errorMessage = ''; // Clear the error message after the specified duration
    }, 3000);
  }

  togglePermiso(id: number) {
    const index = this.permissions.findIndex(p => p.id === id);
    if (index !== -1) {
      this.permissions[index].seleccionado = !this.permissions[index].seleccionado;
    }
  }

  backUpdate() {
    this.router.navigate(['/rolespermisos']);
  }

}
