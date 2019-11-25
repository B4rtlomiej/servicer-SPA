import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminModeService {
  isAdminMode = false;

  constructor() { }
}