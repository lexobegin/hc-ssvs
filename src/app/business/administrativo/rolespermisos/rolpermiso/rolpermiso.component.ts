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
      if (response) {
        this.roles = response;
      } else {
        //this.showError('No users found.');
      }
    } catch (error: any) {
      //this.showError(error.message);
    }
  }

}
