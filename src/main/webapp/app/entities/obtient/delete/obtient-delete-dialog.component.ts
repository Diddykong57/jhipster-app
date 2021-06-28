import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IObtient } from '../obtient.model';
import { ObtientService } from '../service/obtient.service';

@Component({
  templateUrl: './obtient-delete-dialog.component.html',
})
export class ObtientDeleteDialogComponent {
  obtient?: IObtient;

  constructor(protected obtientService: ObtientService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.obtientService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
