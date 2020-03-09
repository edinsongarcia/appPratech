import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserInterface } from '../../models/user';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onUpdate(form): void {
    this.authService.update(form.value).subscribe(res => {
      this.router.navigateByUrl('/auth/home');
      console.log("usuario actualizado con exito");
    });
  }

}
