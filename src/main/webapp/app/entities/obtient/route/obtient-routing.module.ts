import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ObtientComponent } from '../list/obtient.component';
import { ObtientDetailComponent } from '../detail/obtient-detail.component';
import { ObtientUpdateComponent } from '../update/obtient-update.component';
import { ObtientRoutingResolveService } from './obtient-routing-resolve.service';

const obtientRoute: Routes = [
  {
    path: '',
    component: ObtientComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ObtientDetailComponent,
    resolve: {
      obtient: ObtientRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ObtientUpdateComponent,
    resolve: {
      obtient: ObtientRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ObtientUpdateComponent,
    resolve: {
      obtient: ObtientRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(obtientRoute)],
  exports: [RouterModule],
})
export class ObtientRoutingModule {}
