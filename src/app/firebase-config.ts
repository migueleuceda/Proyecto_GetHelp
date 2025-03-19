// src/app/firebase-config.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { environment } from '../environments/environment';  // Asegúrate de que la ruta sea correcta

// Inicializa Firebase usando la configuración del environment
const app = initializeApp(environment.firebaseConfig);  // Usa 'environment.firebaseConfig'
const auth = getAuth(app);

// Exporta auth para usarlo en otros archivos
export { auth };
