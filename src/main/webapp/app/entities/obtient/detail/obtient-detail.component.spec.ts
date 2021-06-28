import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ObtientDetailComponent } from './obtient-detail.component';

describe('Component Tests', () => {
  describe('Obtient Management Detail Component', () => {
    let comp: ObtientDetailComponent;
    let fixture: ComponentFixture<ObtientDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [ObtientDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ obtient: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(ObtientDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ObtientDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load obtient on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.obtient).toEqual(expect.objectContaining({ id: 123 }));
      });
    });
  });
});
