import { Component } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css'
})
export default class UsuarioComponent {

  usuarios: any[] = [];
  errorMessage: string = '';

  constructor(
    private readonly userService: AuthService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.loadUsuarios();
  }

  async loadUsuarios() {
    try {
      const token: any = localStorage.getItem('authToken');//token
      const response = await this.userService.getAllUsersV2(token);
      if (response) {
        this.usuarios = response;
      } else {
        //this.showError('No users found.');
      }
    } catch (error: any) {
      //this.showError(error.message);
    }
  }

  navigateToUpdate(userId: string) {
    this.router.navigate(['/usuario/update', userId]);
  }

  async deleteUser(userId: string) {
    const confirmDelete = confirm('Estás seguro de que deseas eliminar este usuario?');
    if (confirmDelete) {
      try {
        const token: any = localStorage.getItem('authToken');//token
        await this.userService.deleteUser(userId, token);
        // Refresh the user list after deletion
        this.loadUsuarios();
      } catch (error: any) {
        this.showError(error.message);
      }
    }
  }

  showError(message: string) {
    this.errorMessage = message;
    setTimeout(() => {
      this.errorMessage = ''; // Clear the error message after the specified duration
    }, 3000);
  }

}
