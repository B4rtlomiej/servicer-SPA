import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { ToastrService } from 'src/app/_services/toastr.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { User } from 'src/app/_models/user';

@Component({
  selector: 'app-user-activate',
  templateUrl: './user-activate.component.html',
  styleUrls: ['./user-activate.component.css']
})
export class UserActivateComponent implements OnInit {
  passwords: any;
  token: string;
  passwordForm: FormGroup;

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute,
    private toastr: ToastrService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.createPasswordForm();
    this.token = this.route.snapshot.paramMap.get('token');
  }

  createPasswordForm() {
    this.passwordForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(4)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.arePasswordsMatching });
  }

  arePasswordsMatching(formGroup: FormGroup) {
    return formGroup.get('password').value === formGroup.get('confirmPassword').value ? null : { mismatch: true };
  }

  setPassword() {
    if (this.passwordForm.valid) {
      localStorage.removeItem('token');
      this.passwords = Object.assign({}, this.passwordForm.value);
      this.passwords.token = this.token;
      this.authService.setPassword(this.passwords).subscribe(() => {
        this.router.navigate(['/']);
        this.toastr.success('Ustawiono hasło.<br/>Zaloguj się.');
      }, error => {
        this.toastr.error(error);
      });
    }
  }
}
