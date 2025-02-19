  import { Component } from '@angular/core';
  import { Pagines } from '../../pagines';
  import { Router } from '@angular/router';


  @Component({
    selector: 'app-mnusuperior',
    templateUrl: './mnusuperior.component.html',
    styleUrl: './mnusuperior.component.css',
    
  })
  export class MnusuperiorComponent {

    portada=false
    quinLink=''
    //email: any
    dropdownOpen=false;
    menuOpen=false;
    urlAvatar='';

    PAGINES: Pagines[] = [
          
      { nom: 'Cursos', url: '/resenya' },
      { nom: 'Resenya', url: '/resenya' },
      { nom: 'xat', url: '/xat' },

    
    ]


  constructor(private router: Router){}// private authService: ServeiAutenticarService, private serveiPerfil: ServeiPerfilsService) { }


  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;  // Cambia entre true y false
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  /*
    ngOnInit(): void {
    this.router.events.subscribe(event => {
    if (event instanceof NavigationEnd) 
    {
      this.portada=(event.url=="/");
      this.quinLink=event.url
      this.email=localStorage.getItem("email")?.toString()
      this.getAvatar();
    }
    });
    }
    

    logout() {
      
      this.authService.logout();
      this.router.navigate(['/login']); //redirigir a la pantalla de login

    }

    getAvatar() {
      this.serveiPerfil.getPerfil().subscribe(dades => {
    if (dades != null) {
      this.urlAvatar = (<Perfil>dades).urlAvatar
    }
    })
    }*/

  }
