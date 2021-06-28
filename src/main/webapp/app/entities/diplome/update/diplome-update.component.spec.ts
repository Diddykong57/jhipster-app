jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { DiplomeService } from '../service/diplome.service';
import { IDiplome, Diplome } from '../diplome.model';
import { IEtudiant } from 'app/entities/etudiant/etudiant.model';
import { EtudiantService } from 'app/entities/etudiant/service/etudiant.service';
import { IMatiere } from 'app/entities/matiere/matiere.model';
import { MatiereService } from 'app/entities/matiere/service/matiere.service';

import { DiplomeUpdateComponent } from './diplome-update.component';

describe('Component Tests', () => {
  describe('Diplome Management Update Component', () => {
    let comp: DiplomeUpdateComponent;
    let fixture: ComponentFixture<DiplomeUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let diplomeService: DiplomeService;
    let etudiantService: EtudiantService;
    let matiereService: MatiereService;

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
      etudiantService = TestBed.inject(EtudiantService);
      matiereService = TestBed.inject(MatiereService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should call etudiant query and add missing value', () => {
        const diplome: IDiplome = { id: 456 };
        const etudiant: IEtudiant = { id: 46690 };
        diplome.etudiant = etudiant;

        const etudiantCollection: IEtudiant[] = [{ id: 87593 }];
        jest.spyOn(etudiantService, 'query').mockReturnValue(of(new HttpResponse({ body: etudiantCollection })));
        const expectedCollection: IEtudiant[] = [etudiant, ...etudiantCollection];
        jest.spyOn(etudiantService, 'addEtudiantToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ diplome });
        comp.ngOnInit();

        expect(etudiantService.query).toHaveBeenCalled();
        expect(etudiantService.addEtudiantToCollectionIfMissing).toHaveBeenCalledWith(etudiantCollection, etudiant);
        expect(comp.etudiantsCollection).toEqual(expectedCollection);
      });

      it('Should call matiere query and add missing value', () => {
        const diplome: IDiplome = { id: 456 };
        const matiere: IMatiere = { id: 9695 };
        diplome.matiere = matiere;

        const matiereCollection: IMatiere[] = [{ id: 24951 }];
        jest.spyOn(matiereService, 'query').mockReturnValue(of(new HttpResponse({ body: matiereCollection })));
        const expectedCollection: IMatiere[] = [matiere, ...matiereCollection];
        jest.spyOn(matiereService, 'addMatiereToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ diplome });
        comp.ngOnInit();

        expect(matiereService.query).toHaveBeenCalled();
        expect(matiereService.addMatiereToCollectionIfMissing).toHaveBeenCalledWith(matiereCollection, matiere);
        expect(comp.matieresCollection).toEqual(expectedCollection);
      });

      it('Should update editForm', () => {
        const diplome: IDiplome = { id: 456 };
        const etudiant: IEtudiant = { id: 76994 };
        diplome.etudiant = etudiant;
        const matiere: IMatiere = { id: 39396 };
        diplome.matiere = matiere;

        activatedRoute.data = of({ diplome });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(diplome));
        expect(comp.etudiantsCollection).toContain(etudiant);
        expect(comp.matieresCollection).toContain(matiere);
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

    describe('Tracking relationships identifiers', () => {
      describe('trackEtudiantById', () => {
        it('Should return tracked Etudiant primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackEtudiantById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });

      describe('trackMatiereById', () => {
        it('Should return tracked Matiere primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackMatiereById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });
    });
  });
});
