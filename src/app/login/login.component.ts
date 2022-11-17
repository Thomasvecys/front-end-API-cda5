import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    public authService: AuthService,
    public router: Router) {
      this.loginForm= this.formBuilder.group({
        username: [''],
        password: ['']
      })
    }

  ngOnInit(): void {
  }

  loginUser() {
    this.authService.login(this.loginForm.value)
  }

}
