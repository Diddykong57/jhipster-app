import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IMatiere, Matiere } from '../matiere.model';
import { MatiereService } from '../service/matiere.service';
import { IDiplome } from 'app/entities/diplome/diplome.model';
import { DiplomeService } from 'app/entities/diplome/service/diplome.service';

@Component({
  selector: 'jhi-matiere-update',
  templateUrl: './matiere-update.component.html',
})
export class MatiereUpdateComponent implements OnInit {
  isSaving = false;

  diplomesCollection: IDiplome[] = [];

  editForm = this.fb.group({
    id: [],
    nameMat: [],
    coefMat: [null, [Validators.min(0), Validators.max(5)]],
    diplome: [],
  });

  constructor(
    protected matiereService: MatiereService,
    protected diplomeService: DiplomeService,
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

  trackDiplomeById(index: number, item: IDiplome): number {
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
      diplome: matiere.diplome,
    });

    this.diplomesCollection = this.diplomeService.addDiplomeToCollectionIfMissing(this.diplomesCollection, matiere.diplome);
  }

  protected loadRelationshipsOptions(): void {
    this.diplomeService
      .query({ filter: 'matiere-is-null' })
      .pipe(map((res: HttpResponse<IDiplome[]>) => res.body ?? []))
      .pipe(
        map((diplomes: IDiplome[]) => this.diplomeService.addDiplomeToCollectionIfMissing(diplomes, this.editForm.get('diplome')!.value))
      )
      .subscribe((diplomes: IDiplome[]) => (this.diplomesCollection = diplomes));
  }

  protected createFromForm(): IMatiere {
    return {
      ...new Matiere(),
      id: this.editForm.get(['id'])!.value,
      nameMat: this.editForm.get(['nameMat'])!.value,
      coefMat: this.editForm.get(['coefMat'])!.value,
      diplome: this.editForm.get(['diplome'])!.value,
    };
  }
}
