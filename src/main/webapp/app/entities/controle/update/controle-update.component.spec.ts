jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { ControleService } from '../service/controle.service';
import { IControle, Controle } from '../controle.model';

import { ControleUpdateComponent } from './controle-update.component';

describe('Component Tests', () => {
  describe('Controle Management Update Component', () => {
    let comp: ControleUpdateComponent;
    let fixture: ComponentFixture<ControleUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let controleService: ControleService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [ControleUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(ControleUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ControleUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      controleService = TestBed.inject(ControleService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should update editForm', () => {
        const controle: IControle = { id: 456 };

        activatedRoute.data = of({ controle });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(controle));
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Controle>>();
        const controle = { id: 123 };
        jest.spyOn(controleService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ controle });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: controle }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(controleService.update).toHaveBeenCalledWith(controle);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Controle>>();
        const controle = new Controle();
        jest.spyOn(controleService, 'create').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ controle });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: controle }));
        saveSubject.complete();

        // THEN
        expect(controleService.create).toHaveBeenCalledWith(controle);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Controle>>();
        const controle = { id: 123 };
        jest.spyOn(controleService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ controle });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(controleService.update).toHaveBeenCalledWith(controle);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });
  });
});
