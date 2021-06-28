import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ControleDetailComponent } from './controle-detail.component';

describe('Component Tests', () => {
  describe('Controle Management Detail Component', () => {
    let comp: ControleDetailComponent;
    let fixture: ComponentFixture<ControleDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [ControleDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ controle: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(ControleDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ControleDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load controle on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.controle).toEqual(expect.objectContaining({ id: 123 }));
      });
    });
  });
});
