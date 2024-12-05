import { Component, OnInit } from '@angular/core';
//import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';

import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { StorageService } from 'src/app/storage.service';
import  {CommonModule} from '@angular/common'

interface Persona{
  nombre: string;
  edad:   string;
  carrera:string;
  seccion:string;
  identificador:string;
}


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule,CommonModule],
})
export class HomePage implements OnInit{

  nombre:string =''
  edad=''
  carrera:any=''
  seccion:string =''

// variables para leer parametros
par_username: string="";
par_password: number=0;

// Variables para CRUD

personas:Persona[]=[];
currentId:string=""; // variable para almacenar el identificador

  constructor(private router:Router,
              private storageservice:StorageService
  ) {}

  async ngOnInit() {
    const navigation =this.router.getCurrentNavigation();

    if (navigation?.extras.queryParams) { 
      this.par_username=navigation.extras.queryParams['username']
      this.par_password=navigation.extras.queryParams['password']
    }

    await this.storageservice.init();
    await this.listar();

  } // fin ngOnit

  async agregar() {
      const nuevaPersona={
        nombre:this.nombre,
        edad:this.edad,
        carrera:this.carrera,
        seccion:this.seccion,
        identificador:Date.now().toString()   // genero un identificador unico
      };

      // Agregar la nueva persona al arreglo de personas
      this.personas.push(nuevaPersona);

      let resp= await  this.storageservice.agregar('personas',nuevaPersona);

      if (resp) {
          //alert('Persona Agregada');
          await this.listar();
      }else{
          alert('Error no se pudo agregar')
      }

      // limpiamos variables
      this.nombre="";
      this.edad="";
      this.carrera="";
      this.seccion="";
  } // fin agregar

async listar() {
   this.personas  = await this.storageservice.obtenerDatos('personas') || [];
} // fin listar

async eliminar(id:any){
  await this.storageservice.eliminar('personas', id);
  await this.listar();
} // fin eliminar


async buscar(id: any){

let registroEncontrado = await  this.storageservice.obtenerDato('personas',id);

  if(registroEncontrado) {
    this.nombre = registroEncontrado.nombre;
    this.edad = registroEncontrado.edad;
    this.carrera =registroEncontrado.carrera;
    this.currentId =registroEncontrado.identificador;
    this.seccion = registroEncontrado.seccion;

  }// fin if

} // fin buscar


async modificar() {
  const personaModificada: Persona={
    nombre:this.nombre,
    edad:this.edad,
    carrera:this.carrera,
    seccion:this.seccion,
    identificador: this.currentId  // identificador actual
  };

  await  this.storageservice.actualizar('personas', personaModificada);
  await this.listar();

 // limpiamos variables
 this.nombre="";
 this.edad="";
 this.carrera="";
 this.seccion=" ";

}// fin modificar


} // Fin
