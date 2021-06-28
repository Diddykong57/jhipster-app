jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { IControle, Controle } from '../controle.model';
import { ControleService } from '../service/controle.service';

import { ControleRoutingResolveService } from './controle-routing-resolve.service';

describe('Service Tests', () => {
  describe('Controle routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: ControleRoutingResolveService;
    let service: ControleService;
    let resultControle: IControle | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(ControleRoutingResolveService);
      service = TestBed.inject(ControleService);
      resultControle = undefined;
    });

    describe('resolve', () => {
      it('should return IControle returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultControle = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultControle).toEqual({ id: 123 });
      });

      it('should return new IControle if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultControle = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultControle).toEqual(new Controle());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as Controle })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultControle = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultControle).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
