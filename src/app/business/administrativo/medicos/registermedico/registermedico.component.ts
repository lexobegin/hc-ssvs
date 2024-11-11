import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth.service';
import { log } from 'node:console';

@Component({
  selector: 'app-registermedico',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './registermedico.component.html',
  styleUrl: './registermedico.component.css'
})
export default class RegistermedicoComponent {

  formData: any = {
    nombre: '',
    direccion: '',
    telefono: '',
    edad: '',
    nroLicencia: '',
    email: '',
    password: '',
    especialidades: [] as number[]
  };

  errorMessage: string = '';
  especialidades: any[] = [];

  constructor(
    private readonly userService: AuthService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.loadEspecialidades();
  }

  async loadEspecialidades() {
    try {
      const token: any = localStorage.getItem('authToken');//token
      const response = await this.userService.getAllEspecialidades(token);
      //console.log('RESPONSE: ', response);
      
      if (response) {
        this.especialidades = response.map((especialidad: { id: number, nombre: string }) => ({ ...especialidad, seleccionado: false }));
      } else {
        this.showError('No se encontraron especialidades.');
      }
    } catch (error: any) {
      this.showError(error.message);
    }
  }

  async handleSubmit() {

    // Check if all fields are not empty
    if (!this.formData.nombre || !this.formData.direccion || !this.formData.telefono || !this.formData.edad || !this.formData.nroLicencia || !this.formData.email || !this.formData.password) {
      this.showError('Por favor, rellene todos los campos obligatorios *.');
      return;
    }

    // Confirm registration with user
    const confirmRegistration = confirm('Está seguro de que desea registrar a este medico?');
    if (!confirmRegistration) {
      return;
    }

    try {
      const token = localStorage.getItem('authToken');//token
      if (!token) {
        throw new Error('No se ha encontrado ningún token');
      }

      // Filtrar los permisos seleccionados y mapearlos a string
      const especialidadesSeleccionados = this.especialidades.filter(especialidad => especialidad.seleccionado);
      this.formData.especialidades = especialidadesSeleccionados.map(especialidad => especialidad.id.toString());
  
      // Verifica la estructura del formData antes de enviarlo
      //console.log('formData antes de enviarlo:', this.formData);

      const response = await this.userService.createMedico(this.formData, token);
      //console.log('Resp: ', response);
      

      
      //if (response.statusCode === 200) {
      if (response) {
        this.router.navigate(['/medicos']);
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
    const index = this.especialidades.findIndex(especialidad => especialidad.id === id);
    if (index !== -1) {
      this.especialidades[index].seleccionado = !this.especialidades[index].seleccionado;
    }
  }

}

/*
export default class RegistermedicoComponent {

  formData: any = {
    nombre: '',
    direccion: '',
    telefono: '',
    edad: '',
    nroLicencia: '',
    email: '',
    password: ''
  };

  errorMessage: string = '';

  constructor(
    private readonly userService: AuthService,
    private readonly router: Router
  ) { }

  async handleSubmit() {

    // Check if all fields are not empty
    if (!this.formData.nombre || !this.formData.direccion || !this.formData.telefono || !this.formData.edad || !this.formData.nroLicencia || !this.formData.email || !this.formData.password) {
      this.showError('Por favor, rellene todos los campos obligatorios *.');
      return;
    }

    // Confirm registration with user
    const confirmRegistration = confirm('Está seguro de que desea registrar a este medico?');
    if (!confirmRegistration) {
      return;
    }

    try {
      const token = localStorage.getItem('authToken');//token
      if (!token) {
        throw new Error('No se ha encontrado ningún token');
      }

      const response = await this.userService.register(this.formData, token);
      if (response.statusCode === 200) {
        this.router.navigate(['/medicos']);
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

}

*/
