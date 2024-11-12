import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export default class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = ''; // Aquí manejamos los errores de login

  constructor(private authService: AuthService, private router: Router){

  }

  login(): void {

    if (!this.email || !this.password) {
      //this.errorMessage = 'Por favor ingresa tu correo y contraseña.';
      this.showError('Por favor ingresa tu correo y contraseña.');
      return;
    }

    //this.authService.login(this.email, this.password).subscribe({
      //next: ()=> this.router.navigate(['/dashboard']),
      /*next: (response)=> {
        const token = response.token;
        const payload = JSON.parse(atob(token.split('.')[1]));
        const role = payload.role;
        if(role === 'admin') {
          this.router.navigate(['/dashboard'])
        }else {
          this.router.navigate(['/profile'])
        }
      },*/
      //error: (err) => console.error('Login failed', err)
    //})

    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        // Aquí se manejaría la lógica si tienes roles diferentes
        // Descomenta el bloque si deseas verificar el rol
        /* 
        const token = response.token;
        const payload = JSON.parse(atob(token.split('.')[1]));
        const role = payload.role;
        if(role === 'admin') {
          this.router.navigate(['/dashboard']);
        } else {
          this.router.navigate(['/profile']);
        }
        */

        // Si no tienes roles, simplemente redirige a dashboard
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        //this.errorMessage = 'Error de login. Verifica tus credenciales.';
        this.showError('Error de login. Verifica tus credenciales.');
        console.error('Login failed', err);
      }
    });

  }

  // Método adicional para capturar "Enter" y hacer login
  onEnter(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.login();
    }
  }

  showError(message: string) {
    this.errorMessage = message;
    setTimeout(() => {
      this.errorMessage = ''; // Clear the error message after the specified duration
    }, 3000);
  }

}
