import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { ObtientService } from '../service/obtient.service';

import { ObtientComponent } from './obtient.component';

describe('Component Tests', () => {
  describe('Obtient Management Component', () => {
    let comp: ObtientComponent;
    let fixture: ComponentFixture<ObtientComponent>;
    let service: ObtientService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [ObtientComponent],
      })
        .overrideTemplate(ObtientComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ObtientComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(ObtientService);

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
      expect(comp.obtients?.[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
