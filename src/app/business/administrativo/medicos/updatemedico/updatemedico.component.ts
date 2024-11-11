import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth.service';


@Component({
  selector: 'app-updatemedico',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './updatemedico.component.html',
  styleUrl: './updatemedico.component.css'
})
export default class UpdatemedicoComponent implements OnInit {

  formData = {
    nombre: '',
    direccion: '',
    telefono: '',
    edad: '',
    nroLicencia: '',
    especialidades: [] as string[]
  };

  errorMessage: string = '';
  especialidades: any[] = [];

  medicoId: string = '';

  constructor(
    private readonly userService: AuthService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.loadEspecialidades();
    this.loadMedicoDetails();
  }

  async loadEspecialidades() {
    try {
      const token: any = localStorage.getItem('authToken');//token
      const response = await this.userService.getAllEspecialidades(token);
      console.log('RESPONSE: ', response);
      
      if (response) {
        this.especialidades = response.map((especialidad: { id: number, nombre: string }) => ({ ...especialidad, seleccionado: false }));
        console.log('RESPONSE2: ', this.especialidades);
      } else {
        this.showError('No se encontraron especialidades.');
      }
    } catch (error: any) {
      this.showError(error.message);
    }
  }

  async loadMedicoDetails() {
    try {
      const token: any = localStorage.getItem('authToken');//token
      const medicoeId = this.route.snapshot.paramMap.get('id');
      if (medicoeId) {
        this.medicoId = medicoeId;
        const response = await this.userService.getUsersById(this.medicoId, token);
        console.log('Medico Details:', response); // Log medico details
        if (response) {
          const medico = response.usuarios;
          console.log('Aqui: medico', medico);
          
          this.formData.nombre = medico.nombre || '';
          this.formData.direccion = medico.direccion || '';
          this.formData.telefono = medico.telefono || '';
          this.formData.edad = medico.edad || '';
          this.formData.nroLicencia = medico.nroLicencia || '';

          const especialidadesme = medico.especialidades.map((especialidad: { id: string }) => especialidad.id);
          console.log('Medico Details22:', especialidadesme);
          this.especialidades.forEach(especialidad => {
            especialidad.seleccionado = especialidadesme.includes(especialidad.id);
          });
        } else {
          this.showError('No se encontraron detalles del medico.');
        }
      } else {
        this.showError('No se proporcionó un ID de medico.');
      }
    } catch (error: any) {
      this.showError(error.message);
    }
  }

  async handleSubmit() {

    // Check if all fields are not empty
    if (!this.formData.nombre || !this.formData.direccion || !this.formData.telefono || !this.formData.edad || !this.formData.nroLicencia ) {
      this.showError('Por favor, rellene todos los campos obligatorios *.');
      return;
    }

    // Confirmar actualización con el usuario
    const confirmRegistration = confirm('Está seguro de que desea actualizar a este medico?');
    if (!confirmRegistration) {
      return;
    }

    try {
      const token = localStorage.getItem('authToken');//token
      if (!token) {
        throw new Error('No se ha encontrado ningún token');
      }

      // Filtrar las especialidades seleccionados y mapearlos a string
      const especialidadesSeleccionados = this.especialidades.filter(especialidad => especialidad.seleccionado);
      this.formData.especialidades = especialidadesSeleccionados.map(especialidad => especialidad.id.toString());
  
      // Verifica la estructura del formData antes de enviarlo
      //console.log('formData antes de enviarlo:', this.formData);
      console.log('Updating Role:', this.medicoId, this.formData); // Log update data

      const response = await this.userService.updateMedicoE(this.medicoId, this.formData, token);
      //console.log('Resp: ', response);
      console.log('Update Response:', response);

      
      //if (response.statusCode === 200) {
      if (response) {
        this.router.navigate(['/medicos']);
      } else {
        this.showError('Error al actualizar el medico.');
      }
    } catch (error: any) {
      console.error('Update Error:', error); // Log error
      this.showError(error.message);
    }
  }

  showError(message: string) {
    this.errorMessage = message;
    setTimeout(() => {
      this.errorMessage = ''; // Clear the error message after the specified duration
    }, 3000);
  }

  toggleEspecialidad(id: number) {
    const index = this.especialidades.findIndex(especialidad => especialidad.id === id);
    if (index !== -1) {
      this.especialidades[index].seleccionado = !this.especialidades[index].seleccionado;
    }
  }

  backUpdate() {
    this.router.navigate(['/medicos']);
  }

}
