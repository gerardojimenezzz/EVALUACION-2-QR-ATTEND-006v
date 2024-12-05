import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // Constructor del servicio
  constructor() { }

  /**
   * Valida las credenciales del usuario
   * @param usuario - Nombre de usuario
   * @param clave - Contraseña proporcionada por el usuario
   * @returns boolean - Devuelve true si las credenciales son válidas, de lo contrario false.
   */
  validaServicio(usuario: string, clave: string): boolean {
    // Lista de usuarios y claves válidas
    const usuariosValidos = [
      { usuario: 'profe', clave: '123456' },
      { usuario: 'admin', clave: '1234' },
      { usuario: 'profe2', clave: '020617' },
      { usuario: 'profe3', clave: '2023' }
    ];

    // Validamos si el nombre de usuario y la clave coinciden con alguna de las credenciales almacenadas
    return usuariosValidos.some(u => u.usuario === usuario && u.clave === clave);
  }
}
