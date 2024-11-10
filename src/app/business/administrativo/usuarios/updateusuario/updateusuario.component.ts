import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-updateusuario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './updateusuario.component.html',
  styleUrl: './updateusuario.component.css'
})
export default class UpdateusuarioComponent implements OnInit{

  constructor(private readonly userService:AuthService,
  private readonly router: Router,
    private readonly route:ActivatedRoute){}

  userId: any;
  userData: any = {}

  errorMessage: string = '';

  ngOnInit(): void {
    this.getUserById()
      
  }

  async getUserById(){
      this.userId = this.route.snapshot.paramMap.get('id')
      const token = localStorage.getItem('authToken')//token
      if(!this.userId || !token){
          this.showError("Se requiere ID de usuario o token")
          return;
      }

      try {
        let userDataResponse = await this.userService.getUsersById(this.userId, token)
        const {role, nombre, direccion, email} = userDataResponse.usuarios
        this.userData = {role, nombre, direccion, email};
        
      } catch (error:any) {
        this.showError(error.message);
      }
  }

  async updateUser(){

    // Check if all fields are not empty
    if (!this.userData.role || !this.userData.nombre || !this.userData.direccion || !this.userData.email) {
      this.showError('Por favor, rellene todos los campos obligatorios *.');
      return;
    }

    const confitm = confirm("Estás seguro de que quieres actualizar a esta usuario?")
    if(!confitm) return

    try{
      const token = localStorage.getItem('authToken')//token
      if(!token){
        throw new Error("Token no encontrado")
      }
      const res = await this.userService.updateUSer(this.userId, this.userData, token);
      console.log(res)

      if(res.statusCode === 200){
        this.router.navigate(['/usuarios'])
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
    this.router.navigate(['/usuarios']);
  }

}
