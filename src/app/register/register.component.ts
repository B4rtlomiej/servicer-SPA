import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { AuthService } from '../_services/auth.service';
import { ToastrService } from '../_services/toastr.service';
import { User } from '../_models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  user: User;
  registerForm: FormGroup;

  constructor(private authService: AuthService, private toastr: ToastrService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.arePasswordsMatching });
  }

  arePasswordsMatching(formGroup: FormGroup) {
    return formGroup.get('password').value === formGroup.get('confirmPassword').value ? null : { mismacz: true };
  }

  register() {
    if (this.registerForm.valid) {
      this.user = Object.assign({}, this.registerForm.value);
      this.authService.register(this.user).subscribe(() => {
        this.toastr.success('Zarejestrowano użytkownika.');
      }, error => {
        this.toastr.error(error);
      })
    }
  }

  cancel() {
    this.cancelRegister.emit(false);
    console.log('cancelled');
  }

}
