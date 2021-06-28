import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ObtientComponent } from './list/obtient.component';
import { ObtientDetailComponent } from './detail/obtient-detail.component';
import { ObtientUpdateComponent } from './update/obtient-update.component';
import { ObtientDeleteDialogComponent } from './delete/obtient-delete-dialog.component';
import { ObtientRoutingModule } from './route/obtient-routing.module';

@NgModule({
  imports: [SharedModule, ObtientRoutingModule],
  declarations: [ObtientComponent, ObtientDetailComponent, ObtientUpdateComponent, ObtientDeleteDialogComponent],
  entryComponents: [ObtientDeleteDialogComponent],
})
export class ObtientModule {}
