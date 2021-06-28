import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IObtient, Obtient } from '../obtient.model';
import { ObtientService } from '../service/obtient.service';
import { IControle } from 'app/entities/controle/controle.model';
import { ControleService } from 'app/entities/controle/service/controle.service';
import { IEtudiant } from 'app/entities/etudiant/etudiant.model';
import { EtudiantService } from 'app/entities/etudiant/service/etudiant.service';

@Component({
  selector: 'jhi-obtient-update',
  templateUrl: './obtient-update.component.html',
})
export class ObtientUpdateComponent implements OnInit {
  isSaving = false;

  controlesSharedCollection: IControle[] = [];
  etudiantsSharedCollection: IEtudiant[] = [];

  editForm = this.fb.group({
    id: [],
    note: [null, [Validators.required, Validators.min(0), Validators.max(20)]],
    controle: [null, Validators.required],
    etudiant: [null, Validators.required],
  });

  constructor(
    protected obtientService: ObtientService,
    protected controleService: ControleService,
    protected etudiantService: EtudiantService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ obtient }) => {
      this.updateForm(obtient);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const obtient = this.createFromForm();
    if (obtient.id !== undefined) {
      this.subscribeToSaveResponse(this.obtientService.update(obtient));
    } else {
      this.subscribeToSaveResponse(this.obtientService.create(obtient));
    }
  }

  trackControleById(index: number, item: IControle): number {
    return item.id!;
  }

  trackEtudiantById(index: number, item: IEtudiant): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IObtient>>): void {
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

  protected updateForm(obtient: IObtient): void {
    this.editForm.patchValue({
      id: obtient.id,
      note: obtient.note,
      controle: obtient.controle,
      etudiant: obtient.etudiant,
    });

    this.controlesSharedCollection = this.controleService.addControleToCollectionIfMissing(
      this.controlesSharedCollection,
      obtient.controle
    );
    this.etudiantsSharedCollection = this.etudiantService.addEtudiantToCollectionIfMissing(
      this.etudiantsSharedCollection,
      obtient.etudiant
    );
  }

  protected loadRelationshipsOptions(): void {
    this.controleService
      .query()
      .pipe(map((res: HttpResponse<IControle[]>) => res.body ?? []))
      .pipe(
        map((controles: IControle[]) =>
          this.controleService.addControleToCollectionIfMissing(controles, this.editForm.get('controle')!.value)
        )
      )
      .subscribe((controles: IControle[]) => (this.controlesSharedCollection = controles));

    this.etudiantService
      .query()
      .pipe(map((res: HttpResponse<IEtudiant[]>) => res.body ?? []))
      .pipe(
        map((etudiants: IEtudiant[]) =>
          this.etudiantService.addEtudiantToCollectionIfMissing(etudiants, this.editForm.get('etudiant')!.value)
        )
      )
      .subscribe((etudiants: IEtudiant[]) => (this.etudiantsSharedCollection = etudiants));
  }

  protected createFromForm(): IObtient {
    return {
      ...new Obtient(),
      id: this.editForm.get(['id'])!.value,
      note: this.editForm.get(['note'])!.value,
      controle: this.editForm.get(['controle'])!.value,
      etudiant: this.editForm.get(['etudiant'])!.value,
    };
  }
}
