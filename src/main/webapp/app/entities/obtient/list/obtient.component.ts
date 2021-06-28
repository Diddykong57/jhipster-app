import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IObtient } from '../obtient.model';
import { ObtientService } from '../service/obtient.service';
import { ObtientDeleteDialogComponent } from '../delete/obtient-delete-dialog.component';

@Component({
  selector: 'jhi-obtient',
  templateUrl: './obtient.component.html',
})
export class ObtientComponent implements OnInit {
  obtients?: IObtient[];
  isLoading = false;

  constructor(protected obtientService: ObtientService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.obtientService.query().subscribe(
      (res: HttpResponse<IObtient[]>) => {
        this.isLoading = false;
        this.obtients = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IObtient): number {
    return item.id!;
  }

  delete(obtient: IObtient): void {
    const modalRef = this.modalService.open(ObtientDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.obtient = obtient;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
