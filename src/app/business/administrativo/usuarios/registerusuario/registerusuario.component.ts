import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth.service';


@Component({
  selector: 'app-registerusuario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './registerusuario.component.html',
  styleUrl: './registerusuario.component.css'
})
export default class RegisterusuarioComponent {

  formData: any = {
    role: '',
    nombre: '',
    direccion: '',
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
    if (!this.formData.role || !this.formData.nombre || !this.formData.direccion || !this.formData.email || !this.formData.password) {
      this.showError('Por favor, rellene todos los campos obligatorios *.');
      return;
    }

    // Confirm registration with user
    const confirmRegistration = confirm('Está seguro de que desea registrar a este usuario?');
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
        this.router.navigate(['/usuarios']);
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
