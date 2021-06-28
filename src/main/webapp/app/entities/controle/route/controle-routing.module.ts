import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ControleComponent } from '../list/controle.component';
import { ControleDetailComponent } from '../detail/controle-detail.component';
import { ControleUpdateComponent } from '../update/controle-update.component';
import { ControleRoutingResolveService } from './controle-routing-resolve.service';

const controleRoute: Routes = [
  {
    path: '',
    component: ControleComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ControleDetailComponent,
    resolve: {
      controle: ControleRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ControleUpdateComponent,
    resolve: {
      controle: ControleRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ControleUpdateComponent,
    resolve: {
      controle: ControleRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(controleRoute)],
  exports: [RouterModule],
})
export class ControleRoutingModule {}
