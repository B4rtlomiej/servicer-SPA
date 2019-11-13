import { Component, OnInit } from '@angular/core';
import { User } from '../../_models/user';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminModeService } from 'src/app/_services/admin-mode.service';
import { UserService } from 'src/app/_services/user.service';
import { ToastrService } from 'src/app/_services/toastr.service';
import { Pagination, PaginatedResult } from 'src/app/_models/pagination';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[];
  roleList = [
    { value: 'Admin', display: 'Admin' },
    { value: 'Manager', display: 'Manager' },
    { value: 'Agent', display: 'Agent' }
  ];
  activeInactiveList = [
    { value: 'true', display: 'Active' },
    { value: 'false', display: 'Inactive' }
  ];

  userParams: any = {};
  pagination: Pagination;

  constructor(private router: ActivatedRoute, private userService: UserService, private toastr: ToastrService,
    private adminMode: AdminModeService) { }

  ngOnInit() {
    this.adminMode.isAdminMode = true;
    this.router.data.subscribe(data => {
      this.users = data.users.result;
      this.pagination = data.users.pagination;
    });
    this.userParams.userRole = 'Admin';
    this.userParams.isActive = true;
    this.userParams.orderBy = 'lastActive';
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadUsers();
  }

  resetFilters() {
    this.userParams.userRole = 'Admin';
    this.userParams.isActive = true;
    this.userParams.orderBy = 'lastActive';
    this.loadUsers();
  }

  loadUsers() {
    this.userService
      .getUsers(this.pagination.currentPage, this.pagination.itemsPerPage, this.userParams)
      .subscribe(
        (res: PaginatedResult<User[]>) => {
          this.users = res.result;
          this.pagination = res.pagination;
        },
        error => {
          this.toastr.error(error);
        }
      );
  }
  resetPassword(id: number) {
    this.userService.resetPassword(id).subscribe(
      () => {
        this.toastr.success('Zresetowano hasło.');
      },
      error => {
        this.toastr.error(error);
      }
    );
  }

  changeIsActive(id: number, isActive: boolean) {
    const activeMessage = isActive ? 'Dezaktywowano' : 'Aktywowano';
    this.userService.changeIsActive(id).subscribe(() => {
      this.loadUsers();
      this.toastr.success(activeMessage + ' użytkownika.');
    }, error => {
      this.toastr.error(error);
    });
  }
}
