import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IDiplome, Diplome } from '../diplome.model';
import { DiplomeService } from '../service/diplome.service';
import { IEtudiant } from 'app/entities/etudiant/etudiant.model';
import { EtudiantService } from 'app/entities/etudiant/service/etudiant.service';
import { IMatiere } from 'app/entities/matiere/matiere.model';
import { MatiereService } from 'app/entities/matiere/service/matiere.service';

@Component({
  selector: 'jhi-diplome-update',
  templateUrl: './diplome-update.component.html',
})
export class DiplomeUpdateComponent implements OnInit {
  isSaving = false;

  etudiantsCollection: IEtudiant[] = [];
  matieresCollection: IMatiere[] = [];

  editForm = this.fb.group({
    id: [],
    nameDipl: [],
    etudiant: [],
    matiere: [],
  });

  constructor(
    protected diplomeService: DiplomeService,
    protected etudiantService: EtudiantService,
    protected matiereService: MatiereService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ diplome }) => {
      this.updateForm(diplome);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const diplome = this.createFromForm();
    if (diplome.id !== undefined) {
      this.subscribeToSaveResponse(this.diplomeService.update(diplome));
    } else {
      this.subscribeToSaveResponse(this.diplomeService.create(diplome));
    }
  }

  trackEtudiantById(index: number, item: IEtudiant): number {
    return item.id!;
  }

  trackMatiereById(index: number, item: IMatiere): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDiplome>>): void {
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

  protected updateForm(diplome: IDiplome): void {
    this.editForm.patchValue({
      id: diplome.id,
      nameDipl: diplome.nameDipl,
      etudiant: diplome.etudiant,
      matiere: diplome.matiere,
    });

    this.etudiantsCollection = this.etudiantService.addEtudiantToCollectionIfMissing(this.etudiantsCollection, diplome.etudiant);
    this.matieresCollection = this.matiereService.addMatiereToCollectionIfMissing(this.matieresCollection, diplome.matiere);
  }

  protected loadRelationshipsOptions(): void {
    this.etudiantService
      .query({ filter: 'diplome-is-null' })
      .pipe(map((res: HttpResponse<IEtudiant[]>) => res.body ?? []))
      .pipe(
        map((etudiants: IEtudiant[]) =>
          this.etudiantService.addEtudiantToCollectionIfMissing(etudiants, this.editForm.get('etudiant')!.value)
        )
      )
      .subscribe((etudiants: IEtudiant[]) => (this.etudiantsCollection = etudiants));

    this.matiereService
      .query({ filter: 'diplome-is-null' })
      .pipe(map((res: HttpResponse<IMatiere[]>) => res.body ?? []))
      .pipe(
        map((matieres: IMatiere[]) => this.matiereService.addMatiereToCollectionIfMissing(matieres, this.editForm.get('matiere')!.value))
      )
      .subscribe((matieres: IMatiere[]) => (this.matieresCollection = matieres));
  }

  protected createFromForm(): IDiplome {
    return {
      ...new Diplome(),
      id: this.editForm.get(['id'])!.value,
      nameDipl: this.editForm.get(['nameDipl'])!.value,
      etudiant: this.editForm.get(['etudiant'])!.value,
      matiere: this.editForm.get(['matiere'])!.value,
    };
  }
}
