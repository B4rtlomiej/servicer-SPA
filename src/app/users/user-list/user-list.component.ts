import { Component, OnInit } from '@angular/core';
import { User } from '../../_models/user';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminModeService } from 'src/app/_services/admin-mode.service';
import { UserService } from 'src/app/_services/user.service';
import { ToastrService } from 'src/app/_services/toastr.service';
import { Pagination, PaginatedResult } from 'src/app/_models/pagination';
import { registerOutsideClick } from 'ngx-bootstrap';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[];
  pagination: Pagination;

  constructor(private router: ActivatedRoute, private userService: UserService,
    private toastr: ToastrService, private adminMode: AdminModeService) { }

  ngOnInit() {
    this.adminMode.isAdminMode = true;
    this.router.data.subscribe(data => {
      this.users = data.users.result;
      this.pagination = data.users.pagination;
    });
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    console.log(this.pagination.currentPage);
    this.loadUsers();
  }

  loadUsers(){
    this.userService.getUsers(this.pagination.currentPage, this.pagination.itemsPerPage)
    .subscribe((res: PaginatedResult<User[]>)=> {
      this.users = res.result;
      this.pagination = res.pagination;
    },
    error => {
      this.toastr.error(error);
    });
  }
  resetPassword(id: number) {
    this.userService.resetPassword(id).subscribe(() => {
      this.toastr.success('Zresetowano hasło.');
    }, error => {
      this.toastr.error(error);
    });
  }
}
