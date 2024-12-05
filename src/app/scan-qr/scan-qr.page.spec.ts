import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScanQrPage } from './scan-qr.page';
import { IonicModule } from '@ionic/angular';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ScanQrPage', () => {
  let component: ScanQrPage;
  let fixture: ComponentFixture<ScanQrPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScanQrPage],
      imports: [IonicModule.forRoot()],
      schemas: [NO_ERRORS_SCHEMA] // Esto permite omitir errores por componentes hijos no declarados
    }).compileComponents();

    fixture = TestBed.createComponent(ScanQrPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the ScanQrPage component', () => {
    expect(component).toBeTruthy();
  });

  it('should have the requestCameraPermission function', () => {
    expect(component.requestCameraPermission).toBeDefined();
  });

  it('should call requestCameraPermission when the button is clicked', () => {
    spyOn(component, 'requestCameraPermission'); // Espía la función
    const button = fixture.debugElement.query(By.css('ion-button'));
    button.triggerEventHandler('click', null);
    expect(component.requestCameraPermission).toHaveBeenCalled();
  });

  it('should display scanner result when scannerResult is set', () => {
    component.scannerResult = 'QR Code scanned';
    fixture.detectChanges();
    const resultElement = fixture.debugElement.query(By.css('.scanner-result'));
    expect(resultElement.nativeElement.textContent).toContain('QR Code scanned');
  });

  it('should display "Solicitar Permisos" button if camera permission is not granted', () => {
    component.isCameraPermissionGranted = false; // Simula que no se han concedido permisos
    fixture.detectChanges();
    const permissionButton = fixture.debugElement.query(By.css('ion-button'));
    expect(permissionButton.nativeElement.textContent).toContain('Solicitar Permisos');
  });

  it('should hide "Solicitar Permisos" button if camera permission is granted', () => {
    component.isCameraPermissionGranted = true; // Simula que se han concedido permisos
    fixture.detectChanges();
    const permissionButton = fixture.debugElement.query(By.css('ion-button'));
    expect(permissionButton).toBeNull(); // El botón ya no debe estar presente
  });
});




