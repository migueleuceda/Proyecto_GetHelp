import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Perfil } from '../modelsdedades/perfil';
import { entradaLog } from '../modelsdedades/entradaLog';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {

  user = {
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
  };

  errorMessage = '';
  loading = false;

  constructor(private authService: AuthService, private router: Router) {}
  
  async googleLogin() {
    this.loading = true;
    this.errorMessage = '';
    
    try {
      await this.authService.googleLogin();
      // La redirección se maneja en el servicio
    } catch (error: any) {
      this.errorMessage = 'Error al iniciar sessió amb Google. Si us plau, torneu-ho a provar.';
      console.error('Google login error:', error);
    } finally {
      this.loading = false;
    }
  }

  async register() {
    // Validaciones básicas
    if (!this.user.email || !this.user.password || !this.user.confirmPassword || !this.user.name) {
      this.errorMessage = 'Si us plau, ompliu tots els camps.';
      return;
    }

    if (this.user.password !== this.user.confirmPassword) {
      this.errorMessage = 'Les contrasenyes no coincideixen.';
      return;
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.user.email)) {
      this.errorMessage = 'Si us plau, introduïu un correu electrònic vàlid.';
      return;
    }

    // Validar longitud de contraseña
    if (this.user.password.length < 6) {
      this.errorMessage = 'La contrasenya ha de tenir almenys 6 caràcters.';
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    try {
      // Utilizar el servicio de autenticación para registrar al usuario
      await this.authService.register(
        this.user.email,
        this.user.password,
        this.user.name
      );
      // El registro fue exitoso y la redirección se maneja en el servicio
    } catch (error: any) {
      // Capturar el mensaje de error específico del servicio
      this.errorMessage = error.message || 'Error al registrar l\'usuari. Si us plau, torneu-ho a provar.';
      console.error('Registration error:', error);
    } finally {
      this.loading = false;
    }
  }
}