import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IControle } from '../controle.model';

@Component({
  selector: 'jhi-controle-detail',
  templateUrl: './controle-detail.component.html',
})
export class ControleDetailComponent implements OnInit {
  controle: IControle | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ controle }) => {
      this.controle = controle;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
