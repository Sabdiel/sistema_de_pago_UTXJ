import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-private-tasks',
  templateUrl: './private-tasks.component.html',
  styleUrls: ['./private-tasks.component.css']
})
export class PrivateTasksComponent implements OnInit {
  isloggin = false;

  newForm = this.fb.group({
    tipo_persona: [''],
    curp: [''],
    beneficiario: [''],
    nombre: [''],
    apellido_paterno: [''],
    apellido_materno: [''],
    calle: [''],
    numero_exterior: [''],
    numero_interior: [''],
    colonia: [''],
    codigo_postal: [''],
    entidad: [''],
    municipio: [''],
    localidad: [''],
    concepto: [''],
    correo: [''],
    telefono: [''],
  });
  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.isloggin = this.authService.isLogged;
    if (this.isloggin === false) {
      this.singOut();
    }
  }

  ngOnInit(): void {
    
  }

  singOut(){
    localStorage.removeItem('token');
    this.router.navigate(['/signin']);
  }

  insert() {
    const formValue = this.newForm.value;
    console.log(formValue);
    this.authService.insert(formValue).subscribe((res: any) => {
      console.log(res);
    });
  }
}
