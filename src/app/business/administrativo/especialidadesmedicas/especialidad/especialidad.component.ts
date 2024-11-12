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
  errorMessage: string = ''

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
        this.showError('No users found.');
      }
    } catch (error: any) {
      this.showError(error.message);
    }
  }

  async deleteEspecialidad(especialidadID: string) {
    const confirmDelete = confirm('¿Estás seguro que desea eliminar esta especialidad');
    if (confirmDelete) {
      try {
        const token: any = localStorage.getItem('authToken');//token
        await this.userService.deleteEspecialidad(especialidadID, token);
        // Refresh the user list after deletion
        this.loadEspecialidades();
      } catch (error: any) {
        this.showError(error.message);
      }
    }
  }

  navigateToUpdate(especialidadID: string) {
    this.router.navigate(['/especialidades/update/', especialidadID]);
  }

  showError(message: string) {
    this.errorMessage = message;
    setTimeout(() => {
      this.errorMessage = ''; // Clear the error message after the specified duration
    }, 3000);
  }

}
