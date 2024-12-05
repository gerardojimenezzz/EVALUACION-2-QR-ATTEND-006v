import { Component, OnInit,OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';


import { Html5QrcodeScanner, Html5QrcodeScanType } from 'html5-qrcode';

@Component({
  selector: 'app-scan-qr',
  templateUrl: './scan-qr.page.html',
  styleUrls: ['./scan-qr.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ScanQrPage implements OnInit, OnDestroy {

//Declarar variables 
scannerResult:string | null=null;
private html5QrCode: Html5QrcodeScanner | null=null;
isCameraPermissionGranted:boolean =false;

  constructor() { }

  ngOnInit() {
  }

  requestCameraPermission(){
    alert('Entre');
    //verifico si ya se concedio permisos

    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia ){
      navigator.mediaDevices.getUserMedia({ video:true})
      .then((strem) => {
        this.isCameraPermissionGranted =true;
        this.startScanner();
      })

      .catch((error) =>{
        alert("Error al solicitar permisos de camara");
      })

    }else{
      alert("Navegado no soporta el acceso a la camara");
    }

  } // fin  requestCameraPermission

  startScanner(){
    const config ={
      fps:10,
      qrbox:250,
      supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA]
    }

    this.html5QrCode = new Html5QrcodeScanner("reader",config,false)

    this.html5QrCode.render( (result) =>{
      this.scannerResult=result;  // Almacena el resultado
      console.log("Resultado del scaner",result);
    }, (error) => {
      console.warn("error al escanear el codigo QR", error)
    });
  } // fin startScanner


  ngOnDestroy(){
    if(this.html5QrCode){
      this.html5QrCode.clear();  //Detiene scanner
    }
  }

}
