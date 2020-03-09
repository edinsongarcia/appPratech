import { Component, OnInit, Input} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserInterface } from '../../models/user';
import { Observable } from 'rxjs';
import { EditComponent } from '../edit/edit.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  users: UserInterface[];
  deleted: any;

  constructor( private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authService.getUsers().subscribe(data => this.users = data, error => console.log(error));
  }

  sendEdit(user: UserInterface) {
    console.log("este es para editar " + user);
    console.log("ID para editar " + user.id);
    this.deleted = this.authService.sendUser(user).subscribe(data => this.deleted = data, error => console.log(error));
  }

  remove(user: UserInterface) {
    this.deleted = this.authService.deleteUser(user).subscribe(data => this.deleted = data, error => console.log(error));
  }

  logout() {
      this.authService.logout();
  }
}
