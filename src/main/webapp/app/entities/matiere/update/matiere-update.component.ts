import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IMatiere, Matiere } from '../matiere.model';
import { MatiereService } from '../service/matiere.service';
import { IControle } from 'app/entities/controle/controle.model';
import { ControleService } from 'app/entities/controle/service/controle.service';

@Component({
  selector: 'jhi-matiere-update',
  templateUrl: './matiere-update.component.html',
})
export class MatiereUpdateComponent implements OnInit {
  isSaving = false;

  controlesCollection: IControle[] = [];

  editForm = this.fb.group({
    id: [],
    nameMat: [],
    coefMat: [null, [Validators.min(0)]],
    controle: [],
  });

  constructor(
    protected matiereService: MatiereService,
    protected controleService: ControleService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ matiere }) => {
      this.updateForm(matiere);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const matiere = this.createFromForm();
    if (matiere.id !== undefined) {
      this.subscribeToSaveResponse(this.matiereService.update(matiere));
    } else {
      this.subscribeToSaveResponse(this.matiereService.create(matiere));
    }
  }

  trackControleById(index: number, item: IControle): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMatiere>>): void {
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

  protected updateForm(matiere: IMatiere): void {
    this.editForm.patchValue({
      id: matiere.id,
      nameMat: matiere.nameMat,
      coefMat: matiere.coefMat,
      controle: matiere.controle,
    });

    this.controlesCollection = this.controleService.addControleToCollectionIfMissing(this.controlesCollection, matiere.controle);
  }

  protected loadRelationshipsOptions(): void {
    this.controleService
      .query({ filter: 'matiere-is-null' })
      .pipe(map((res: HttpResponse<IControle[]>) => res.body ?? []))
      .pipe(
        map((controles: IControle[]) =>
          this.controleService.addControleToCollectionIfMissing(controles, this.editForm.get('controle')!.value)
        )
      )
      .subscribe((controles: IControle[]) => (this.controlesCollection = controles));
  }

  protected createFromForm(): IMatiere {
    return {
      ...new Matiere(),
      id: this.editForm.get(['id'])!.value,
      nameMat: this.editForm.get(['nameMat'])!.value,
      coefMat: this.editForm.get(['coefMat'])!.value,
      controle: this.editForm.get(['controle'])!.value,
    };
  }
}
