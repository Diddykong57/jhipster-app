jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { EtudiantService } from '../service/etudiant.service';
import { IEtudiant, Etudiant } from '../etudiant.model';
import { IDiplome } from 'app/entities/diplome/diplome.model';
import { DiplomeService } from 'app/entities/diplome/service/diplome.service';

import { EtudiantUpdateComponent } from './etudiant-update.component';

describe('Component Tests', () => {
  describe('Etudiant Management Update Component', () => {
    let comp: EtudiantUpdateComponent;
    let fixture: ComponentFixture<EtudiantUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let etudiantService: EtudiantService;
    let diplomeService: DiplomeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [EtudiantUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(EtudiantUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EtudiantUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      etudiantService = TestBed.inject(EtudiantService);
      diplomeService = TestBed.inject(DiplomeService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should call firstName query and add missing value', () => {
        const etudiant: IEtudiant = { id: 456 };
        const firstName: IDiplome = { id: 82310 };
        etudiant.firstName = firstName;

        const firstNameCollection: IDiplome[] = [{ id: 54715 }];
        jest.spyOn(diplomeService, 'query').mockReturnValue(of(new HttpResponse({ body: firstNameCollection })));
        const expectedCollection: IDiplome[] = [firstName, ...firstNameCollection];
        jest.spyOn(diplomeService, 'addDiplomeToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ etudiant });
        comp.ngOnInit();

        expect(diplomeService.query).toHaveBeenCalled();
        expect(diplomeService.addDiplomeToCollectionIfMissing).toHaveBeenCalledWith(firstNameCollection, firstName);
        expect(comp.firstNamesCollection).toEqual(expectedCollection);
      });

      it('Should update editForm', () => {
        const etudiant: IEtudiant = { id: 456 };
        const firstName: IDiplome = { id: 54574 };
        etudiant.firstName = firstName;

        activatedRoute.data = of({ etudiant });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(etudiant));
        expect(comp.firstNamesCollection).toContain(firstName);
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Etudiant>>();
        const etudiant = { id: 123 };
        jest.spyOn(etudiantService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ etudiant });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: etudiant }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(etudiantService.update).toHaveBeenCalledWith(etudiant);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Etudiant>>();
        const etudiant = new Etudiant();
        jest.spyOn(etudiantService, 'create').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ etudiant });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: etudiant }));
        saveSubject.complete();

        // THEN
        expect(etudiantService.create).toHaveBeenCalledWith(etudiant);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Etudiant>>();
        const etudiant = { id: 123 };
        jest.spyOn(etudiantService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ etudiant });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(etudiantService.update).toHaveBeenCalledWith(etudiant);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });

    describe('Tracking relationships identifiers', () => {
      describe('trackDiplomeById', () => {
        it('Should return tracked Diplome primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackDiplomeById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });
    });
  });
});
