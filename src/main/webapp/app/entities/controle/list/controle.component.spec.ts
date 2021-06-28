import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { ControleService } from '../service/controle.service';

import { ControleComponent } from './controle.component';

describe('Component Tests', () => {
  describe('Controle Management Component', () => {
    let comp: ControleComponent;
    let fixture: ComponentFixture<ControleComponent>;
    let service: ControleService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [ControleComponent],
      })
        .overrideTemplate(ControleComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ControleComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(ControleService);

      const headers = new HttpHeaders().append('link', 'link;link');
      jest.spyOn(service, 'query').mockReturnValue(
        of(
          new HttpResponse({
            body: [{ id: 123 }],
            headers,
          })
        )
      );
    });

    it('Should call load all on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.controles?.[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
