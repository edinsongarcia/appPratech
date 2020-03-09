import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserInterface } from '../../models/user';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { AlertifyService } from '../../services/alertify.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  password: string;
  constructor(private authService: AuthService, private router: Router, private alertify: AlertifyService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
    });

  }

  onRegister(form): void {

    this.authService.register(form.value).subscribe(res => {
      this.router.navigateByUrl('/auth/login');
    });
  }

}
