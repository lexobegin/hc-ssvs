import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth.service';


@Component({
  selector: 'app-updateespecialidad',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './updateespecialidad.component.html',
  styleUrl: './updateespecialidad.component.css'
})
export default class UpdateespecialidadComponent implements OnInit{

  constructor(private readonly userService:AuthService,
    private readonly router: Router,
      private readonly route:ActivatedRoute){}
  
    especialidadId: any;
    especialidadData: any = {}
  
    errorMessage: string = '';
  
    ngOnInit(): void {
      this.getEspecialidadById()
        
    }
  
    async getEspecialidadById(){
        this.especialidadId = this.route.snapshot.paramMap.get('id')
        const token = localStorage.getItem('authToken')//token
        if(!this.especialidadId || !token){
            this.showError("Se requiere ID de especialidad o token")
            return;
        }
  
        try {
          let especialidadDataResponse = await this.userService.getEspecialidadById(this.especialidadId, token)
          console.log('AQUI:',  especialidadDataResponse);
          
          const {nombre, descripcion, condicionestratadas} = especialidadDataResponse;
          this.especialidadData = {nombre, descripcion, condicionestratadas};
          
        } catch (error:any) {
          this.showError(error.message);
        }
    }
  
    async updateEspecialidad(){
  
      // Check if all fields are not empty
      if (!this.especialidadData.nombre || !this.especialidadData.descripcion) {
        this.showError('Por favor, rellene todos los campos obligatorios *.');
        return;
      }
  
      const confitm = confirm("Estás seguro de que quieres actualizar?")
      if(!confitm) return
  
      try{
        const token = localStorage.getItem('authToken')//token
        if(!token){
          throw new Error("Token no encontrado")
        }
        const res = await this.userService.updateEspecialidad(this.especialidadId, this.especialidadData, token);
        console.log(res)
  
        if(res){
          this.router.navigate(['/especialidades'])
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
      this.router.navigate(['/especialidades']);
    }

}
