import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IObtient, Obtient } from '../obtient.model';

import { ObtientService } from './obtient.service';

describe('Service Tests', () => {
  describe('Obtient Service', () => {
    let service: ObtientService;
    let httpMock: HttpTestingController;
    let elemDefault: IObtient;
    let expectedResult: IObtient | IObtient[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(ObtientService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = {
        id: 0,
        note: 0,
      };
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Obtient', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new Obtient()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Obtient', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            note: 1,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a Obtient', () => {
        const patchObject = Object.assign({}, new Obtient());

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Obtient', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            note: 1,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Obtient', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addObtientToCollectionIfMissing', () => {
        it('should add a Obtient to an empty array', () => {
          const obtient: IObtient = { id: 123 };
          expectedResult = service.addObtientToCollectionIfMissing([], obtient);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(obtient);
        });

        it('should not add a Obtient to an array that contains it', () => {
          const obtient: IObtient = { id: 123 };
          const obtientCollection: IObtient[] = [
            {
              ...obtient,
            },
            { id: 456 },
          ];
          expectedResult = service.addObtientToCollectionIfMissing(obtientCollection, obtient);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a Obtient to an array that doesn't contain it", () => {
          const obtient: IObtient = { id: 123 };
          const obtientCollection: IObtient[] = [{ id: 456 }];
          expectedResult = service.addObtientToCollectionIfMissing(obtientCollection, obtient);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(obtient);
        });

        it('should add only unique Obtient to an array', () => {
          const obtientArray: IObtient[] = [{ id: 123 }, { id: 456 }, { id: 1207 }];
          const obtientCollection: IObtient[] = [{ id: 123 }];
          expectedResult = service.addObtientToCollectionIfMissing(obtientCollection, ...obtientArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const obtient: IObtient = { id: 123 };
          const obtient2: IObtient = { id: 456 };
          expectedResult = service.addObtientToCollectionIfMissing([], obtient, obtient2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(obtient);
          expect(expectedResult).toContain(obtient2);
        });

        it('should accept null and undefined values', () => {
          const obtient: IObtient = { id: 123 };
          expectedResult = service.addObtientToCollectionIfMissing([], null, obtient, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(obtient);
        });

        it('should return initial array if no Obtient is added', () => {
          const obtientCollection: IObtient[] = [{ id: 123 }];
          expectedResult = service.addObtientToCollectionIfMissing(obtientCollection, undefined, null);
          expect(expectedResult).toEqual(obtientCollection);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
