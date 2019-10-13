import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { ToastrService } from '../_services/toastr.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  model: any = {};

  constructor(private authService: AuthService, private toastr: ToastrService) { }

  ngOnInit() {
  }

  register() {
    this.authService.register(this.model).subscribe(() => {
      this.toastr.success('Zarejestrowano użytkownika.');
      this.cancelRegister.emit(false);
    }, error => {
      this.toastr.error(String(error).replace('\r\n', '<br/>'));
    });
  }

  cancel() {
    this.cancelRegister.emit(false);
    console.log('cancelled');
  }

}
