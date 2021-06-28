import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as dayjs from 'dayjs';

import { DATE_FORMAT } from 'app/config/input.constants';
import { IControle, Controle } from '../controle.model';

import { ControleService } from './controle.service';

describe('Service Tests', () => {
  describe('Controle Service', () => {
    let service: ControleService;
    let httpMock: HttpTestingController;
    let elemDefault: IControle;
    let expectedResult: IControle | IControle[] | boolean | null;
    let currentDate: dayjs.Dayjs;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(ControleService);
      httpMock = TestBed.inject(HttpTestingController);
      currentDate = dayjs();

      elemDefault = {
        id: 0,
        idCont: 0,
        date: currentDate,
        coefCont: 0,
        type: 'AAAAAAA',
      };
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            date: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Controle', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            date: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            date: currentDate,
          },
          returnedFromService
        );

        service.create(new Controle()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Controle', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            idCont: 1,
            date: currentDate.format(DATE_FORMAT),
            coefCont: 1,
            type: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            date: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a Controle', () => {
        const patchObject = Object.assign(
          {
            type: 'BBBBBB',
          },
          new Controle()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign(
          {
            date: currentDate,
          },
          returnedFromService
        );

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Controle', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            idCont: 1,
            date: currentDate.format(DATE_FORMAT),
            coefCont: 1,
            type: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            date: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Controle', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addControleToCollectionIfMissing', () => {
        it('should add a Controle to an empty array', () => {
          const controle: IControle = { id: 123 };
          expectedResult = service.addControleToCollectionIfMissing([], controle);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(controle);
        });

        it('should not add a Controle to an array that contains it', () => {
          const controle: IControle = { id: 123 };
          const controleCollection: IControle[] = [
            {
              ...controle,
            },
            { id: 456 },
          ];
          expectedResult = service.addControleToCollectionIfMissing(controleCollection, controle);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a Controle to an array that doesn't contain it", () => {
          const controle: IControle = { id: 123 };
          const controleCollection: IControle[] = [{ id: 456 }];
          expectedResult = service.addControleToCollectionIfMissing(controleCollection, controle);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(controle);
        });

        it('should add only unique Controle to an array', () => {
          const controleArray: IControle[] = [{ id: 123 }, { id: 456 }, { id: 70597 }];
          const controleCollection: IControle[] = [{ id: 123 }];
          expectedResult = service.addControleToCollectionIfMissing(controleCollection, ...controleArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const controle: IControle = { id: 123 };
          const controle2: IControle = { id: 456 };
          expectedResult = service.addControleToCollectionIfMissing([], controle, controle2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(controle);
          expect(expectedResult).toContain(controle2);
        });

        it('should accept null and undefined values', () => {
          const controle: IControle = { id: 123 };
          expectedResult = service.addControleToCollectionIfMissing([], null, controle, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(controle);
        });

        it('should return initial array if no Controle is added', () => {
          const controleCollection: IControle[] = [{ id: 123 }];
          expectedResult = service.addControleToCollectionIfMissing(controleCollection, undefined, null);
          expect(expectedResult).toEqual(controleCollection);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
