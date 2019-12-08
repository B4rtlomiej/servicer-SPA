import { Injectable } from '@angular/core';
import { Person } from '../_models/person';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { PersonService } from '../_services/person.service';
import { ToastrService } from '../_services/toastr.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class PersonDetailResolver implements Resolve<Person> {
  constructor( private personService: PersonService, private router: Router, private toastr: ToastrService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<Person> {
    return this.personService.getPerson(route.params.id).pipe(
        catchError(error => {
            this.toastr.error(error);
            this.router.navigate(['/persons']);
            return of(null);
        })
    );
  }
}