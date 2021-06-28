jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { DiplomeService } from '../service/diplome.service';
import { IDiplome, Diplome } from '../diplome.model';

import { DiplomeUpdateComponent } from './diplome-update.component';

describe('Component Tests', () => {
  describe('Diplome Management Update Component', () => {
    let comp: DiplomeUpdateComponent;
    let fixture: ComponentFixture<DiplomeUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let diplomeService: DiplomeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [DiplomeUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(DiplomeUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DiplomeUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      diplomeService = TestBed.inject(DiplomeService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should update editForm', () => {
        const diplome: IDiplome = { id: 456 };

        activatedRoute.data = of({ diplome });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(diplome));
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Diplome>>();
        const diplome = { id: 123 };
        jest.spyOn(diplomeService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ diplome });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: diplome }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(diplomeService.update).toHaveBeenCalledWith(diplome);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Diplome>>();
        const diplome = new Diplome();
        jest.spyOn(diplomeService, 'create').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ diplome });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: diplome }));
        saveSubject.complete();

        // THEN
        expect(diplomeService.create).toHaveBeenCalledWith(diplome);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Diplome>>();
        const diplome = { id: 123 };
        jest.spyOn(diplomeService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ diplome });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(diplomeService.update).toHaveBeenCalledWith(diplome);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });
  });
});
