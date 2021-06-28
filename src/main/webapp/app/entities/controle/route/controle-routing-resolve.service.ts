import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IControle, Controle } from '../controle.model';
import { ControleService } from '../service/controle.service';

@Injectable({ providedIn: 'root' })
export class ControleRoutingResolveService implements Resolve<IControle> {
  constructor(protected service: ControleService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IControle> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((controle: HttpResponse<Controle>) => {
          if (controle.body) {
            return of(controle.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Controle());
  }
}
