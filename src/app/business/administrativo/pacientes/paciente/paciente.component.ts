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
        //this.showError('No users found.');
      }
    } catch (error: any) {
      //this.showError(error.message);
    }
  }

}
