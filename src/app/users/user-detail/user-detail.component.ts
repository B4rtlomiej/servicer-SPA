import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models/user';
import { ToastrService } from 'src/app/_services/toastr.service';
import { UserService } from 'src/app/_services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  public user: User;
  public editForm: FormGroup;
  public isViewMode = true;

  constructor(private userService: UserService, private router: Router, private formBuilder: FormBuilder,
    private toastr: ToastrService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data.user;
    });
    this.createEditForm();
  }

  createEditForm() {
    this.editForm = this.formBuilder.group({
      firstName: [{ value: this.user.person.firstName, disabled: true }, [Validators.required, Validators.maxLength(50)]],
      lastName: [{ value: this.user.person.lastName, disabled: true }],
      email: [{ value: this.user.person.email, disabled: true }],
      phone: [{ value: this.user.person.phone, disabled: true }]
    });
  }

  editUser() {
    this.isViewMode = false;
    this.editForm.get('firstName').enable();
    this.editForm.get('lastName').enable();
    this.editForm.get('email').enable();
    this.editForm.get('phone').enable();
  }

  cancel() {
    this.isViewMode = true;
    this.editForm.get('firstName').disable();
    this.editForm.get('lastName').disable();
    this.editForm.get('email').disable();
    this.editForm.get('phone').disable();
    this.ngOnInit();
  }

  update() {
    this.user.person.firstName = this.editForm.get('firstName').value;
    this.user.person.lastName = this.editForm.get('lastName').value;
    this.user.person.email = this.editForm.get('email').value;
    this.user.person.phone = this.editForm.get('phone').value;

    this.userService.updateUser(this.user).subscribe(() => {
      this.cancel();
      this.toastr.success('Zapisano zmiany.');
    }, error => {
      this.toastr.error(error);
    });
  }
}
