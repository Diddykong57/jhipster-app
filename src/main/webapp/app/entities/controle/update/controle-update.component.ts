import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IControle, Controle } from '../controle.model';
import { ControleService } from '../service/controle.service';
import { IMatiere } from 'app/entities/matiere/matiere.model';
import { MatiereService } from 'app/entities/matiere/service/matiere.service';

@Component({
  selector: 'jhi-controle-update',
  templateUrl: './controle-update.component.html',
})
export class ControleUpdateComponent implements OnInit {
  isSaving = false;

  matieresSharedCollection: IMatiere[] = [];

  editForm = this.fb.group({
    id: [],
    date: [],
    coefCont: [null, [Validators.min(0), Validators.max(5)]],
    type: [],
    matiere: [null, Validators.required],
  });

  constructor(
    protected controleService: ControleService,
    protected matiereService: MatiereService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ controle }) => {
      this.updateForm(controle);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const controle = this.createFromForm();
    if (controle.id !== undefined) {
      this.subscribeToSaveResponse(this.controleService.update(controle));
    } else {
      this.subscribeToSaveResponse(this.controleService.create(controle));
    }
  }

  trackMatiereById(index: number, item: IMatiere): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IControle>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(controle: IControle): void {
    this.editForm.patchValue({
      id: controle.id,
      date: controle.date,
      coefCont: controle.coefCont,
      type: controle.type,
      matiere: controle.matiere,
    });

    this.matieresSharedCollection = this.matiereService.addMatiereToCollectionIfMissing(this.matieresSharedCollection, controle.matiere);
  }

  protected loadRelationshipsOptions(): void {
    this.matiereService
      .query()
      .pipe(map((res: HttpResponse<IMatiere[]>) => res.body ?? []))
      .pipe(
        map((matieres: IMatiere[]) => this.matiereService.addMatiereToCollectionIfMissing(matieres, this.editForm.get('matiere')!.value))
      )
      .subscribe((matieres: IMatiere[]) => (this.matieresSharedCollection = matieres));
  }

  protected createFromForm(): IControle {
    return {
      ...new Controle(),
      id: this.editForm.get(['id'])!.value,
      date: this.editForm.get(['date'])!.value,
      coefCont: this.editForm.get(['coefCont'])!.value,
      type: this.editForm.get(['type'])!.value,
      matiere: this.editForm.get(['matiere'])!.value,
    };
  }
}
