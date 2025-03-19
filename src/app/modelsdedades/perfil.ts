export class Perfil {
  uid!: string; // identificador de l'usuari
  email!: string;
  nom!: string;
  nomFitxerAvatar: string = ''; // nom del fitxer jpg o png amb l'avatar
  urlAvatar: string = ''; // url del fitxer que allotjarem en l'Storage de Firebase
  fitxer?: File; // el fitxer opcional
  
  constructor(params: Partial<Perfil> = {}) {
    Object.assign(this, params);
  }
  
  // Método helper para crear un perfil básico sin avatar
  static createBasic(uid: string, email: string, nom: string): Perfil {
    return new Perfil({
      uid,
      email,
      nom
    });
  }
  
  // Método para añadir un avatar al perfil
  setAvatar(file: File): void {
    this.fitxer = file;
    this.nomFitxerAvatar = file.name;
  }
}