import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private BASE_URL = "http://127.0.0.1:8080";
  private tokenKey = 'authToken';

  private REFRESH_URL = "http://127.0.0.1:8080/auth/refresh'";
  private refreshTokenKey = 'refreshToken';

  constructor(private httpClient: HttpClient, private router: Router) { }

  login(email: string, password: string): Observable<any>{
    const url = `${this.BASE_URL}/auth/signin`;
    return this.httpClient.post<any>(url, {email, password}).pipe(
      tap(response => {
        if(response.token){
          console.log(response.token);
          this.setToken(response.token);
          this.setRefreshToken(response.refreshToken)
          this.autoRefreshToken();
        }
      })
    )
  }

  private setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  } 

  private getToken(): string | null {
    if(typeof window !== 'undefined'){
      return localStorage.getItem(this.tokenKey);
    }else {
      return null;
    }
  }

  private setRefreshToken(token: string): void {
    localStorage.setItem(this.refreshTokenKey, token);
  } 

  private getRefreshToken(): string | null {
    if(typeof window !== 'undefined'){
      return localStorage.getItem(this.refreshTokenKey);
    }else {
      return null;
    }
  }

  refreshToken(): Observable<any>{
    const refreshToken  = this.getRefreshToken()
    return this.httpClient.post<any>(this.REFRESH_URL, {refreshToken}).pipe(
      tap(response => {
        if(response.token){
          console.log(response.token);
          this.setToken(response.token);
          this.setRefreshToken(response.refreshToken)
          this.autoRefreshToken()
        }
      })
    )
  }

  autoRefreshToken(): void {
    const token = this.getToken();
    if(!token){
      return;
    }
    const payload = JSON.parse(atob(token.split('.')[1]));
    const exp = payload.exp * 1000;

    const timeout = exp - Date.now() - (60 * 1000);

    setTimeout(() => {
      this.refreshToken().subscribe()
    }, timeout);
   
  }


  isAuthenticated(): boolean {//Observable<boolean> {
    
    const token = this.getToken();
    if(!token){
      return false; //false;
    }

    const payload = JSON.parse(atob(token.split('.')[1]));
    const exp = payload.exp * 1000;
    return Date.now() < exp; //Date.now() < exp;

    /*try {
      const token = this.getToken();
      if (!token) {
        return of(false);
      }
      
      const payload = JSON.parse(atob(token.split('.')[1]));
      const exp = payload.exp * 1000;
      
      return of(Date.now() < exp);
    } catch (error) {
      console.error("Error en la autenticación: ", error);
      return of(false);
    }*/

  }

  logout(): void{
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.refreshTokenKey);
    this.router.navigate(['/login']);
  }

//USUARIO
async getAllRolesPermisos(token:string):Promise<any>{
  const url = `${this.BASE_URL}/admin/rol/get-all`;
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  })
  try{
    const response =  this.httpClient.get<any>(url, {headers}).toPromise()
    return response;
  }catch(error){
    throw error;
  }
}

//USUARIO
async getAllUsersV2(token:string):Promise<any>{
    const url = `${this.BASE_URL}/admin/get-all-usersV2`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    try{
      const response =  this.httpClient.get<any>(url, {headers}).toPromise()
      return response;
    }catch(error){
      throw error;
    }
  }

//ESPECIALIDADES
async getAllEspecialidades(token:string):Promise<any>{
  const url = `${this.BASE_URL}/admin/especialidad/get-all`;
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  })
  try{
    const response =  this.httpClient.get<any>(url, {headers}).toPromise()
    return response;
  }catch(error){
    throw error;
  }
}  

//MEDICO
async getAllMedicos(token:string):Promise<any>{
  const url = `${this.BASE_URL}/admin/get-all-medico`;
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  })
  try{
    const response =  this.httpClient.get<any>(url, {headers}).toPromise()
    return response;
  }catch(error){
    throw error;
  }
}  

//PACIENTE
async getAllPacientes(token:string):Promise<any>{
  const url = `${this.BASE_URL}/admin/get-all-paciente`;
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  })
  try{
    const response =  this.httpClient.get<any>(url, {headers}).toPromise()
    return response;
  }catch(error){
    throw error;
  }
}

}
