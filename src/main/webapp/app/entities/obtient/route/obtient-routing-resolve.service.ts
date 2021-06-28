import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IObtient, Obtient } from '../obtient.model';
import { ObtientService } from '../service/obtient.service';

@Injectable({ providedIn: 'root' })
export class ObtientRoutingResolveService implements Resolve<IObtient> {
  constructor(protected service: ObtientService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IObtient> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((obtient: HttpResponse<Obtient>) => {
          if (obtient.body) {
            return of(obtient.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Obtient());
  }
}
