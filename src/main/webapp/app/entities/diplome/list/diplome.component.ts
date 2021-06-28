import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IDiplome } from '../diplome.model';
import { DiplomeService } from '../service/diplome.service';
import { DiplomeDeleteDialogComponent } from '../delete/diplome-delete-dialog.component';

@Component({
  selector: 'jhi-diplome',
  templateUrl: './diplome.component.html',
})
export class DiplomeComponent implements OnInit {
  diplomes?: IDiplome[];
  isLoading = false;

  constructor(protected diplomeService: DiplomeService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.diplomeService.query().subscribe(
      (res: HttpResponse<IDiplome[]>) => {
        this.isLoading = false;
        this.diplomes = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IDiplome): number {
    return item.id!;
  }

  delete(diplome: IDiplome): void {
    const modalRef = this.modalService.open(DiplomeDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.diplome = diplome;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
