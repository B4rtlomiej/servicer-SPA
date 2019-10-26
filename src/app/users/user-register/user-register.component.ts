import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/_models/user';
import { AuthService } from 'src/app/_services/auth.service';
import { ToastrService } from 'src/app/_services/toastr.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

  user: User;
  public registerForm: FormGroup;

  constructor(private authService: AuthService, private toastr: ToastrService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      person: this.formBuilder.group({
        firstName: ['', [Validators.required, Validators.maxLength(50)]],
        lastName: ['', [Validators.required, Validators.maxLength(50)]],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9), Validators.pattern('^[0-9]*$')]],
        sex: ['Male']
      }),
      userRole: ['Agent'],
      username: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(6)]]
    });
  }

  register() {
    if (this.registerForm.valid) {
      this.user = Object.assign({}, this.registerForm.value);
      this.authService.register(this.user).subscribe(() => {
        this.router.navigate(['/users']);
        this.toastr.success('Zarejestrowano użytkownika.');
      }, error => {
        this.toastr.error(error);
      });
    }
  }
}
