import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    provideFirebaseApp(() => initializeApp({"projectId":"projecteangular-gethelp","appId":"1:974386551404:web:cab7b1e58f11863678d649","databaseURL":"https://projecteangular-gethelp-default-rtdb.firebaseio.com","storageBucket":"projecteangular-gethelp.firebasestorage.app","apiKey":"AIzaSyBhI14NyPE9XGPNU4z7xVPfZwf-2AWeVmQ","authDomain":"projecteangular-gethelp.firebaseapp.com","messagingSenderId":"974386551404","measurementId":"G-741PY21YRF"})),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideDatabase(() => getDatabase())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
