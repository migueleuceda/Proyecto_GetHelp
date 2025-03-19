import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { entradaLog } from '../modelsdedades/entradaLog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  
  errorMessage: string = '';
  loading: boolean = false;
  email: string = '';
  password: string = '';

  constructor(public serveiAutenticar: AuthService) {}

  ngOnInit(): void {
    // netegem les dades del login anterior
    this.serveiAutenticar.loginOK = false;
    localStorage.removeItem('email');
  }

  async googleLogin() {
    this.loading = true;
    this.errorMessage = '';
    
    try {
      await this.serveiAutenticar.googleLogin();
      // La redirección se gestiona en el servicio
    } catch (error: any) {
      this.errorMessage = error.message || 'Error al iniciar sessió amb Google';
      console.error('Google login error:', error);
    } finally {
      this.loading = false;
    }
  }

  logout() {
    this.serveiAutenticar.logout();
  }

  async login() {
    // Validar que el email no sea undefined o null
    if (!this.email) {
      this.errorMessage = 'Si us plau, introduïu un correu electrònic';
      return;
    }
    
    // Eliminar espacios en blanco al inicio y al final
    this.email = this.email.trim();
    
    // Validar formato de email con una expresión regular
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      this.errorMessage = 'Format de correu electrònic no vàlid';
      return;
    }
    
    if (!this.password) {
      this.errorMessage = 'Si us plau, introduïu la contrasenya';
      return;
    }
    
    // Asignar valores al servicio
    this.serveiAutenticar.email = this.email;
    this.serveiAutenticar.psw = this.password;
    
    this.loading = true;
    this.errorMessage = '';
    
    try {
      await this.serveiAutenticar.login();
      // La redirección se gestiona en el servicio
    } catch (error: any) {
      this.errorMessage = error.message || 'Error al iniciar sessió';
      console.error('Login error:', error);
    } finally {
      this.loading = false;
    }
  }
}