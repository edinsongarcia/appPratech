import { Component, OnInit, Input} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserInterface } from '../../models/user';
import { Observable } from 'rxjs';
import { EditComponent } from '../edit/edit.component';
import { window } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  users: UserInterface[];
  userI: UserInterface;
  deleted: any;
  updated: any;
  id: String;
  email: String;
  name: String;
  password: String;
  dateBirth: Date;
  gender: String;
  country: String;
  aceptTC: Boolean;
  genders = ['Hombre', 'Mujer']

  constructor(private authService: AuthService, private router: Router ) { }

  ngOnInit() {
    this.authService.getUsers().subscribe(data => this.users = data, error => console.log(error));
  }

  sendEdit(user: UserInterface) {
    document.getElementById('id01').style.display = 'block';
    this.id = user._id;
    this.email = user.email;
    this.name = user.name;
    this.password = user.password;
    this.dateBirth = new Date(2018, 2, 22);
    this.gender = user.gender;
    this.country = user.country;
    this.aceptTC = user.acceptTC;
  }

  onUpdate(user: UserInterface): void {

    const userInfo = {
      _id: this.id,
      name: this.name,
      email: this.email,
      password: this.password,
      dateBirth: this.dateBirth,
      gender: this.gender,
      country: this.country,
      acceptTC: this.aceptTC
    }
    this.updated = this.authService.updateUser(userInfo).subscribe(data => this.updated = data, error => console.log(error));
  }

  remove(user: UserInterface) {
    this.deleted = this.authService.deleteUser(user).subscribe(data => this.deleted = data, error => console.log(error));
  }

  logout() {
      this.authService.logout();
  }
}
