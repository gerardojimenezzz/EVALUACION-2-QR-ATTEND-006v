import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-acerca',
  templateUrl: './acerca.page.html',
  standalone: true,
  imports: [IonicModule, CommonModule], // Asegúrate de incluir IonicModule
})
export class AcercaPage {}

