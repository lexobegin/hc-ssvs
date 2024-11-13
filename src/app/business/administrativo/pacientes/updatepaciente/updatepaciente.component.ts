import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-updatepaciente',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './updatepaciente.component.html',
  styleUrl: './updatepaciente.component.css'
})
export default class UpdatepacienteComponent {
constructor(private readonly userService:AuthService,
  private readonly router: Router,
    private readonly route:ActivatedRoute){}

  pacienteId: any;
  pacienteData: any = {}

  errorMessage: string = '';

  ngOnInit(): void {
    this.getUserById()

  }

  async getUserById(){
      this.pacienteId = this.route.snapshot.paramMap.get('id')
      const token = localStorage.getItem('authToken')//token
      if(!this.pacienteId || !token){
          this.showError("Se requiere ID de Paciente o token")
          return;
      }

      try {
        let pacienteDataResponse = await this.userService.getUsersById(this.pacienteId, token)
        console.log("la informacion del paciente",pacienteDataResponse)
        const {nombre, direccion, telefono, edad, peso, altura, sexo} = pacienteDataResponse.usuarios
        this.pacienteData = {nombre, direccion, telefono, edad, peso, altura, sexo};

      } catch (error:any) {
        this.showError(error.message);
      }
  }

  async updatePaciente(){

    // Check if all fields are not empty
    if (!this.pacienteData.nombre || !this.pacienteData.direccion || !this.pacienteData.telefono || !this.pacienteData.edad || !this.pacienteData.peso || !this.pacienteData.altura || !this.pacienteData.sexo) {
      this.showError('Por favor, rellene todos los campos obligatorios *.');
      return;
    }

    const confitm = confirm("Estás seguro de que quieres actualizar a este paciente?")
    if(!confitm) return

    try{
      const token = localStorage.getItem('authToken')//token
      if(!token){
        throw new Error("Token no encontrado")
      }
      const res = await this.userService.updatePaciente(this.pacienteId, this.pacienteData, token);
      console.log(res)

      if(res){
        this.router.navigate(['/pacientes'])
      }else{
        this.showError(res.message)
      }

    }catch(error:any){
      this.showError(error.message)
    }

  }

  showError(message: string) {
    this.errorMessage = message;
    setTimeout(() => {
      this.errorMessage = ''; // Clear the error message after the specified duration
    }, 3000);
  }

  backUpdate() {
    this.router.navigate(['/pacientes']);
  }
}
