jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { IObtient, Obtient } from '../obtient.model';
import { ObtientService } from '../service/obtient.service';

import { ObtientRoutingResolveService } from './obtient-routing-resolve.service';

describe('Service Tests', () => {
  describe('Obtient routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: ObtientRoutingResolveService;
    let service: ObtientService;
    let resultObtient: IObtient | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(ObtientRoutingResolveService);
      service = TestBed.inject(ObtientService);
      resultObtient = undefined;
    });

    describe('resolve', () => {
      it('should return IObtient returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultObtient = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultObtient).toEqual({ id: 123 });
      });

      it('should return new IObtient if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultObtient = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultObtient).toEqual(new Obtient());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as Obtient })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultObtient = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultObtient).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
