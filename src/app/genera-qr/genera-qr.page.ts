import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { QRCodeModule } from 'angularx-qrcode';

@Component({
  selector: 'app-genera-qr',
  templateUrl: './genera-qr.page.html',
  styleUrls: ['./genera-qr.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, QRCodeModule]
})
export class GeneraQrPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  student = {
    name: '',
    carrera: '',
    seccion: ''
  };

  createdCode: string = '';

  // Función para generar el QR con los datos del alumno
  generateQRCode() {
    if (this.student.name && this.student.carrera && this.student.seccion) {
      const studentData = {
        name: this.student.name,
        carrera: this.student.carrera,
        seccion: this.student.seccion
      };
      
      // Convertir los datos del alumno a una cadena JSON
      this.createdCode = JSON.stringify(studentData);
    } else {
      alert('Por favor, complete todos los campos.');
    }
  }
}
