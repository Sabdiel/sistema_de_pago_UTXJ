import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  isloggin = false;
  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.isloggin = this.authService.isLogged;
    if (this.isloggin === false) {
      this.singOut();
    }
  }


  ngOnInit(): void {

  }

  // tslint:disable-next-line:typedef
  singOut() {
    localStorage.removeItem('token');
    this.router.navigate(['/signin']);
  }

}
