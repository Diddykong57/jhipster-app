import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IEtudiant, Etudiant } from '../etudiant.model';
import { EtudiantService } from '../service/etudiant.service';
import { IDiplome } from 'app/entities/diplome/diplome.model';
import { DiplomeService } from 'app/entities/diplome/service/diplome.service';

@Component({
  selector: 'jhi-etudiant-update',
  templateUrl: './etudiant-update.component.html',
})
export class EtudiantUpdateComponent implements OnInit {
  isSaving = false;

  firstNamesCollection: IDiplome[] = [];

  editForm = this.fb.group({
    id: [],
    idEtud: [null, [Validators.required]],
    firstName: [],
    lastName: [],
    firstName: [],
  });

  constructor(
    protected etudiantService: EtudiantService,
    protected diplomeService: DiplomeService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ etudiant }) => {
      this.updateForm(etudiant);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const etudiant = this.createFromForm();
    if (etudiant.id !== undefined) {
      this.subscribeToSaveResponse(this.etudiantService.update(etudiant));
    } else {
      this.subscribeToSaveResponse(this.etudiantService.create(etudiant));
    }
  }

  trackDiplomeById(index: number, item: IDiplome): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEtudiant>>): void {
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

  protected updateForm(etudiant: IEtudiant): void {
    this.editForm.patchValue({
      id: etudiant.id,
      idEtud: etudiant.idEtud,
      firstName: etudiant.firstName,
      lastName: etudiant.lastName,
      firstName: etudiant.firstName,
    });

    this.firstNamesCollection = this.diplomeService.addDiplomeToCollectionIfMissing(this.firstNamesCollection, etudiant.firstName);
  }

  protected loadRelationshipsOptions(): void {
    this.diplomeService
      .query({ filter: 'etudiant-is-null' })
      .pipe(map((res: HttpResponse<IDiplome[]>) => res.body ?? []))
      .pipe(
        map((diplomes: IDiplome[]) => this.diplomeService.addDiplomeToCollectionIfMissing(diplomes, this.editForm.get('firstName')!.value))
      )
      .subscribe((diplomes: IDiplome[]) => (this.firstNamesCollection = diplomes));
  }

  protected createFromForm(): IEtudiant {
    return {
      ...new Etudiant(),
      id: this.editForm.get(['id'])!.value,
      idEtud: this.editForm.get(['idEtud'])!.value,
      firstName: this.editForm.get(['firstName'])!.value,
      lastName: this.editForm.get(['lastName'])!.value,
      firstName: this.editForm.get(['firstName'])!.value,
    };
  }
}
