jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { MatiereService } from '../service/matiere.service';
import { IMatiere, Matiere } from '../matiere.model';
import { IControle } from 'app/entities/controle/controle.model';
import { ControleService } from 'app/entities/controle/service/controle.service';

import { MatiereUpdateComponent } from './matiere-update.component';

describe('Component Tests', () => {
  describe('Matiere Management Update Component', () => {
    let comp: MatiereUpdateComponent;
    let fixture: ComponentFixture<MatiereUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let matiereService: MatiereService;
    let controleService: ControleService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [MatiereUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(MatiereUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MatiereUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      matiereService = TestBed.inject(MatiereService);
      controleService = TestBed.inject(ControleService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should call controle query and add missing value', () => {
        const matiere: IMatiere = { id: 456 };
        const controle: IControle = { id: 61143 };
        matiere.controle = controle;

        const controleCollection: IControle[] = [{ id: 88446 }];
        jest.spyOn(controleService, 'query').mockReturnValue(of(new HttpResponse({ body: controleCollection })));
        const expectedCollection: IControle[] = [controle, ...controleCollection];
        jest.spyOn(controleService, 'addControleToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ matiere });
        comp.ngOnInit();

        expect(controleService.query).toHaveBeenCalled();
        expect(controleService.addControleToCollectionIfMissing).toHaveBeenCalledWith(controleCollection, controle);
        expect(comp.controlesCollection).toEqual(expectedCollection);
      });

      it('Should update editForm', () => {
        const matiere: IMatiere = { id: 456 };
        const controle: IControle = { id: 56911 };
        matiere.controle = controle;

        activatedRoute.data = of({ matiere });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(matiere));
        expect(comp.controlesCollection).toContain(controle);
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Matiere>>();
        const matiere = { id: 123 };
        jest.spyOn(matiereService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ matiere });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: matiere }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(matiereService.update).toHaveBeenCalledWith(matiere);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Matiere>>();
        const matiere = new Matiere();
        jest.spyOn(matiereService, 'create').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ matiere });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: matiere }));
        saveSubject.complete();

        // THEN
        expect(matiereService.create).toHaveBeenCalledWith(matiere);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Matiere>>();
        const matiere = { id: 123 };
        jest.spyOn(matiereService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ matiere });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(matiereService.update).toHaveBeenCalledWith(matiere);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });

    describe('Tracking relationships identifiers', () => {
      describe('trackControleById', () => {
        it('Should return tracked Controle primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackControleById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });
    });
  });
});