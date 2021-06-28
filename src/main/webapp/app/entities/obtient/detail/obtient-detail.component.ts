import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IObtient } from '../obtient.model';

@Component({
  selector: 'jhi-obtient-detail',
  templateUrl: './obtient-detail.component.html',
})
export class ObtientDetailComponent implements OnInit {
  obtient: IObtient | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ obtient }) => {
      this.obtient = obtient;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
