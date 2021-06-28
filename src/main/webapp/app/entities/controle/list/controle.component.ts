import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IControle } from '../controle.model';
import { ControleService } from '../service/controle.service';
import { ControleDeleteDialogComponent } from '../delete/controle-delete-dialog.component';

@Component({
  selector: 'jhi-controle',
  templateUrl: './controle.component.html',
})
export class ControleComponent implements OnInit {
  controles?: IControle[];
  isLoading = false;

  constructor(protected controleService: ControleService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.controleService.query().subscribe(
      (res: HttpResponse<IControle[]>) => {
        this.isLoading = false;
        this.controles = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IControle): number {
    return item.id!;
  }

  delete(controle: IControle): void {
    const modalRef = this.modalService.open(ControleDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.controle = controle;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
