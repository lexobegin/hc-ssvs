import { Component } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-rolpermiso',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './rolpermiso.component.html',
  styleUrl: './rolpermiso.component.css'
})
export default class RolpermisoComponent {

  roles: any[] = [];
  errorMessage: string = ''

  constructor(
    private readonly userService: AuthService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.loadRoles();
  }

  async loadRoles() {
    try {
      const token: any = localStorage.getItem('authToken');//token
      const response = await this.userService.getAllRolesPermisos(token);
      console.log(response);
      if (response) {
        this.roles = response;
      } else {
        this.showError('No users found.');
      }
    } catch (error: any) {
      this.showError(error.message);
    }
  }

  navigateToUpdate(rolId: string) {
    this.router.navigate(['/rolespermisos/update', rolId]);
  }

  async deleteRol(rolID: string) {
    const confirmDelete = confirm('¿Estás seguro que desea eliminar este Rol?');
    if (confirmDelete) {
      try {
        const token: any = localStorage.getItem('authToken');//token
        await this.userService.deleteRol(rolID, token);
        // Refresh the user list after deletion
        this.loadRoles();
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
