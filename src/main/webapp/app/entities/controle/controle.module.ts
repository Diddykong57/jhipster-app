import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ControleComponent } from './list/controle.component';
import { ControleDetailComponent } from './detail/controle-detail.component';
import { ControleUpdateComponent } from './update/controle-update.component';
import { ControleDeleteDialogComponent } from './delete/controle-delete-dialog.component';
import { ControleRoutingModule } from './route/controle-routing.module';

@NgModule({
  imports: [SharedModule, ControleRoutingModule],
  declarations: [ControleComponent, ControleDetailComponent, ControleUpdateComponent, ControleDeleteDialogComponent],
  entryComponents: [ControleDeleteDialogComponent],
})
export class ControleModule {}
