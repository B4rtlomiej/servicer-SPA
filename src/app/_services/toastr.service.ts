import { Injectable } from '@angular/core';
import * as toastr from 'toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastrService {

  constructor() {
    toastr.options.progressBar = true;
    toastr.options.positionClass = 'toast-top-center';
  }

  success(message: string) {
    toastr.success(message);
  }

  info(message: string) {
    toastr.info(message);
  }

  warning(message: string) {
    toastr.warning(message);
  }

  error(message: string) {
    toastr.error(message);
  }
}
