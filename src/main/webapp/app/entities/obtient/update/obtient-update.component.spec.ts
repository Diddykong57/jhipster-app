jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { ObtientService } from '../service/obtient.service';
import { IObtient, Obtient } from '../obtient.model';
import { IControle } from 'app/entities/controle/controle.model';
import { ControleService } from 'app/entities/controle/service/controle.service';
import { IEtudiant } from 'app/entities/etudiant/etudiant.model';
import { EtudiantService } from 'app/entities/etudiant/service/etudiant.service';

import { ObtientUpdateComponent } from './obtient-update.component';

describe('Component Tests', () => {
  describe('Obtient Management Update Component', () => {
    let comp: ObtientUpdateComponent;
    let fixture: ComponentFixture<ObtientUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let obtientService: ObtientService;
    let controleService: ControleService;
    let etudiantService: EtudiantService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [ObtientUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(ObtientUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ObtientUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      obtientService = TestBed.inject(ObtientService);
      controleService = TestBed.inject(ControleService);
      etudiantService = TestBed.inject(EtudiantService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should call Controle query and add missing value', () => {
        const obtient: IObtient = { id: 456 };
        const controle: IControle = { id: 85067 };
        obtient.controle = controle;

        const controleCollection: IControle[] = [{ id: 67385 }];
        jest.spyOn(controleService, 'query').mockReturnValue(of(new HttpResponse({ body: controleCollection })));
        const additionalControles = [controle];
        const expectedCollection: IControle[] = [...additionalControles, ...controleCollection];
        jest.spyOn(controleService, 'addControleToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ obtient });
        comp.ngOnInit();

        expect(controleService.query).toHaveBeenCalled();
        expect(controleService.addControleToCollectionIfMissing).toHaveBeenCalledWith(controleCollection, ...additionalControles);
        expect(comp.controlesSharedCollection).toEqual(expectedCollection);
      });

      it('Should call Etudiant query and add missing value', () => {
        const obtient: IObtient = { id: 456 };
        const etudiant: IEtudiant = { id: 13517 };
        obtient.etudiant = etudiant;

        const etudiantCollection: IEtudiant[] = [{ id: 10294 }];
        jest.spyOn(etudiantService, 'query').mockReturnValue(of(new HttpResponse({ body: etudiantCollection })));
        const additionalEtudiants = [etudiant];
        const expectedCollection: IEtudiant[] = [...additionalEtudiants, ...etudiantCollection];
        jest.spyOn(etudiantService, 'addEtudiantToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ obtient });
        comp.ngOnInit();

        expect(etudiantService.query).toHaveBeenCalled();
        expect(etudiantService.addEtudiantToCollectionIfMissing).toHaveBeenCalledWith(etudiantCollection, ...additionalEtudiants);
        expect(comp.etudiantsSharedCollection).toEqual(expectedCollection);
      });

      it('Should update editForm', () => {
        const obtient: IObtient = { id: 456 };
        const controle: IControle = { id: 54653 };
        obtient.controle = controle;
        const etudiant: IEtudiant = { id: 42336 };
        obtient.etudiant = etudiant;

        activatedRoute.data = of({ obtient });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(obtient));
        expect(comp.controlesSharedCollection).toContain(controle);
        expect(comp.etudiantsSharedCollection).toContain(etudiant);
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Obtient>>();
        const obtient = { id: 123 };
        jest.spyOn(obtientService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ obtient });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: obtient }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(obtientService.update).toHaveBeenCalledWith(obtient);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Obtient>>();
        const obtient = new Obtient();
        jest.spyOn(obtientService, 'create').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ obtient });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: obtient }));
        saveSubject.complete();

        // THEN
        expect(obtientService.create).toHaveBeenCalledWith(obtient);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Obtient>>();
        const obtient = { id: 123 };
        jest.spyOn(obtientService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ obtient });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(obtientService.update).toHaveBeenCalledWith(obtient);
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

      describe('trackEtudiantById', () => {
        it('Should return tracked Etudiant primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackEtudiantById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });
    });
  });
});
