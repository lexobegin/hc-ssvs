import { Component } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-paciente',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './paciente.component.html',
  styleUrl: './paciente.component.css'
})
export default class PacienteComponent {

  pacientes: any[] = [];
  errorMessage: string = '';

  constructor(
    private readonly userService: AuthService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.loadPacientes();
  }

  async loadPacientes() {
    try {
      const token: any = localStorage.getItem('authToken');//token
      const response = await this.userService.getAllPacientes(token);
      if (response) {
        this.pacientes = response;
      } else {
        //this.showError('No paciente found.');
      }
    } catch (error: any) {
      //this.showError(error.message);
    }
  }

  navigateToUpdate(userId: string) {
    this.router.navigate(['/paciente/update', userId]);
  }

  async deletePaciente(userId: string) {
    const confirmDelete = confirm('Estás seguro de que deseas eliminar este paciente?');
    if (confirmDelete) {
      try {
        const token: any = localStorage.getItem('authToken');//token
        await this.userService.deletePaciente(userId, token);
        // Refresh the user list after deletion
        this.loadPacientes();
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
