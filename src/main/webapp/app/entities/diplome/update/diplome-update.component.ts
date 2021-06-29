import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IDiplome, Diplome } from '../diplome.model';
import { DiplomeService } from '../service/diplome.service';

@Component({
  selector: 'jhi-diplome-update',
  templateUrl: './diplome-update.component.html',
})
export class DiplomeUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    nameDipl: [],
  });

  constructor(protected diplomeService: DiplomeService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ diplome }) => {
      this.updateForm(diplome);
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
    });
  }

  protected createFromForm(): IDiplome {
    return {
      ...new Diplome(),
      id: this.editForm.get(['id'])!.value,
      nameDipl: this.editForm.get(['nameDipl'])!.value,
    };
  }
}
