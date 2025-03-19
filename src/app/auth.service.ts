import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Perfil } from './modelsdedades/perfil';
import { entradaLog } from './modelsdedades/entradaLog';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { GoogleAuthProvider } from 'firebase/auth';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class AuthService
{
  email: string = '';
  psw: string = '';
  loginOK: boolean = false;
  user$: Observable<Perfil | null | undefined>;  
  constructor( private afAuth: AngularFireAuth, private afs: AngularFirestore, private router: Router )
  {
    // Observable del usuario actual
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user =>
      {
        if (user)
        {
          return this.afs.doc<Perfil>(`users/${user.uid}`).valueChanges();
        }

        else
        {
          return of(null);
        }
      })
    );
  }

  // Inicio de sesión con correo/contraseña
  async login(): Promise<void>
  {
    try
    {
      const result = await this.afAuth.signInWithEmailAndPassword(this.email, this.psw);
      
      if (result.user)
      {
        this.loginOK = true;
        localStorage.setItem('email', this.email);
        
        // Registrar la operación en el log
        const logEntry: entradaLog =
        {
          op: 'login',
          usuari: this.email
        };

        await this.afs.collection('logs').add(logEntry);
        
        this.router.navigate(['/dashboard']);
      }
    }
    
    catch (error: any)
    {
      this.loginOK = false;
      console.error('Error en login:', error);
      throw error;
    }
  }

  // Registro de usuario con correo/contraseña
  async register(email: string, password: string, name: string): Promise<void>
  {
    try
    {
      const result = await this.afAuth.createUserWithEmailAndPassword(email, password);
      
      if (result.user)
        {
        // Crear perfil de usuario sin avatar inicialmente
        const userProfile: Partial<Perfil> =
        {
          uid: result.user.uid,
          email: email,
          nom: name,
          nomFitxerAvatar: '',
          urlAvatar: ''
        };
        
        // Guardar en Firestore
        await this.afs.doc(`users/${result.user.uid}`).set(userProfile);
        
        // Registrar la operación en el log
        const logEntry: entradaLog =
        {
          op: 'login',
          usuari: email
        };

        await this.afs.collection('logs').add(logEntry);
        
        // Iniciar sesión automáticamente
        this.email = email;
        this.psw = password;
        this.loginOK = true;
        localStorage.setItem('email', email);
        
        this.router.navigate(['/dashboard']);
      }
    }

    catch (error: any)
    {
      console.error('Error en registro:', error);
      throw error;
    }
  }

  // Inicio de sesión con Google
  async googleLogin(): Promise<void>
  {
    try
    {
      const provider = new GoogleAuthProvider();
      const result = await this.afAuth.signInWithPopup(provider);
      
      if (result.user)
      {
        // Verificar si es un usuario nuevo
        const userDoc = await this.afs.doc(`users/${result.user.uid}`).get().toPromise();
        
        if (!userDoc?.exists)
        {
          // Es un usuario nuevo, crear perfil
          const userProfile: Partial<Perfil> =
          {
            uid: result.user.uid,
            email: result.user.email || '',
            nom: result.user.displayName || '',
            nomFitxerAvatar: '',
            urlAvatar: result.user.photoURL || ''
          };
          
          await this.afs.doc(`users/${result.user.uid}`).set(userProfile);
        }
        
        // Registrar la operación en el log
        const logEntry: entradaLog =
        {
          op: 'login',
          usuari: result.user.email || ''
        };

        await this.afs.collection('logs').add(logEntry);
        
        this.loginOK = true;
        localStorage.setItem('email', result.user.email || '');
        
        this.router.navigate(['/dashboard']);
      }
    }
    
    catch (error: any)
    {
      console.error('Error en Google login:', error);
      throw error;
    }
  }

  // Cerrar sesión
  async logout(): Promise<void>
  {
    try
    {
      const currentUser = await this.afAuth.currentUser;
      if (currentUser)
      {
        // Registrar la operación en el log
        const logEntry: entradaLog =
        {
          op: 'logout',
          usuari: currentUser.email || ''
        };

        await this.afs.collection('logs').add(logEntry);
      }
      
      await this.afAuth.signOut();
      this.loginOK = false;
      localStorage.removeItem('email');
      this.router.navigate(['/login']);
    } 
    
    catch (error)
    {
      console.error('Error en logout:', error);
      throw error;
    }
  }

  // Actualizar perfil de usuario con avatar
  async updateProfile(profile: Perfil): Promise<void>
  {
    if (!profile.uid) 
    {
      throw new Error('UID de usuario no válido');
    }
    
    try
    {
      // Si hay un archivo de avatar, primero subir a storage
      if (profile.fitxer)
        {
        // Aquí iría la lógica para subir el archivo a Firebase Storage
        // y obtener la URL, por ejemplo:
        // const uploadTask = await this.storage.ref(`avatars/${profile.uid}`).put(profile.fitxer);
        // profile.urlAvatar = await uploadTask.ref.getDownloadURL();
        // profile.nomFitxerAvatar = profile.fitxer.name;
      }
      
      // Eliminamos la propiedad fitxer antes de guardar en Firestore
      const profileToSave = { ...profile };
      delete (profileToSave as any).fitxer;
      
      // Guardar en Firestore
      await this.afs.doc(`users/${profile.uid}`).update(profileToSave);
    }
    
    catch (error)
    {
      console.error('Error al actualizar perfil:', error);
      throw error;
    }
  }

  // Verificar si el usuario está autenticado
  isLoggedIn(): boolean
  {
    return this.loginOK || !!localStorage.getItem('email');
  }
}