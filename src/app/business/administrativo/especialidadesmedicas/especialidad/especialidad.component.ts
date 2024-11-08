import { Component } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-especialidad',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './especialidad.component.html',
  styleUrl: './especialidad.component.css'
})
export default class EspecialidadComponent {

  especialidades: any[] = [];

  constructor(
    private readonly userService: AuthService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.loadEspecialidades();
  }

  async loadEspecialidades() {
    try {
      const token: any = localStorage.getItem('authToken');//token
      const response = await this.userService.getAllEspecialidades(token);
      if (response) {
        this.especialidades = response;
      } else {
        //this.showError('No users found.');
      }
    } catch (error: any) {
      //this.showError(error.message);
    }
  }

}
