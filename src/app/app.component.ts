import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})


export class AppComponent implements OnInit{//Original
  title = 'hc-ssvs';

  constructor( private authService: AuthService) {}

  ngOnInit(): void {
   if(this.authService.isAuthenticated()) {
    this.authService.autoRefreshToken()
   }
  }
}

