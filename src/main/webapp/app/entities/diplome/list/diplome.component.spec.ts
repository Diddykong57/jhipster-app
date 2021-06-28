import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { DiplomeService } from '../service/diplome.service';

import { DiplomeComponent } from './diplome.component';

describe('Component Tests', () => {
  describe('Diplome Management Component', () => {
    let comp: DiplomeComponent;
    let fixture: ComponentFixture<DiplomeComponent>;
    let service: DiplomeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [DiplomeComponent],
      })
        .overrideTemplate(DiplomeComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DiplomeComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(DiplomeService);

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
      expect(comp.diplomes?.[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
