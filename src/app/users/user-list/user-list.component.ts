import { Component, OnInit } from '@angular/core';
import { User } from '../../_models/user';
import { UserService } from '../../_services/user.service';
import { ToastrService } from '../../_services/toastr.service';
import { ActivatedRoute } from '@angular/router';
import { AdminModeService } from 'src/app/_services/admin-mode.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[];

  // tslint:disable-next-line: max-line-length
  constructor(private userService: UserService, private router: ActivatedRoute, private toastr: ToastrService, private adminMode: AdminModeService) { }

  ngOnInit() {
    this.adminMode.isAdminMode = true;
    this.router.data.subscribe(data => {
      this.users = data.users;
    });
  }
}
