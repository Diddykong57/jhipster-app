import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IControle } from '../controle.model';
import { ControleService } from '../service/controle.service';

@Component({
  templateUrl: './controle-delete-dialog.component.html',
})
export class ControleDeleteDialogComponent {
  controle?: IControle;

  constructor(protected controleService: ControleService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.controleService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
