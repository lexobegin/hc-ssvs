import { Component } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-medico',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './medico.component.html',
  styleUrl: './medico.component.css'
})
export default class MedicoComponent {

  medicos: any[] = [];

  constructor(
    private readonly userService: AuthService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.loadMedicos();
  }

  async loadMedicos() {
    try {
      const token: any = localStorage.getItem('authToken');//token
      const response = await this.userService.getAllMedicos(token);
      if (response) {
        this.medicos = response;
      } else {
        //this.showError('No users found.');
      }
    } catch (error: any) {
      //this.showError(error.message);
    }
  }

}
