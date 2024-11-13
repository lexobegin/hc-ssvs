import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-registerpaciente',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './registerpaciente.component.html',
  styleUrl: './registerpaciente.component.css'
})
export default class RegisterpacienteComponent {
  formData: any = {
    nombre: '',
    direccion: '',
    telefono: '',
    edad: '',
    email: '',
    password: '',
    peso: '',
    altura: '',
    sexo: ''
  };

  errorMessage: string = '';

  constructor(
    private readonly userService: AuthService,
    private readonly router: Router
  ) { }

  async handleSubmit() {

    // Check if all fields are not empty
    if (!this.formData.nombre || !this.formData.direccion || !this.formData.telefono || !this.formData.edad || !this.formData.email || !this.formData.password || !this.formData.peso || !this.formData.altura || !this.formData.sexo) {
      this.showError('Por favor, rellene todos los campos obligatorios *.');
      return;
    }

    // Confirm registration with user
    const confirmRegistration = confirm('Está seguro de que desea registrar a este paciente?');
    if (!confirmRegistration) {
      return;
    }

    try {
      const token = localStorage.getItem('authToken');//token
      if (!token) {
        throw new Error('No se ha encontrado ningún token');
      }

      // Verifica la estructura del formData antes de enviarlo
      //console.log('formData antes de enviarlo:', this.formData);

      const response = await this.userService.createPaciente(this.formData, token);
      //console.log('Resp: ', response);
      //if (response.statusCode === 200) {
      if (response) {
        this.router.navigate(['/pacientes']);
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
