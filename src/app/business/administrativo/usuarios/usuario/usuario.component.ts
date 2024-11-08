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

}
