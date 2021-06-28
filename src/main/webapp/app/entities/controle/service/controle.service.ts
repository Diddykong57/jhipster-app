import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as dayjs from 'dayjs';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IControle, getControleIdentifier } from '../controle.model';

export type EntityResponseType = HttpResponse<IControle>;
export type EntityArrayResponseType = HttpResponse<IControle[]>;

@Injectable({ providedIn: 'root' })
export class ControleService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/controles');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(controle: IControle): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(controle);
    return this.http
      .post<IControle>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(controle: IControle): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(controle);
    return this.http
      .put<IControle>(`${this.resourceUrl}/${getControleIdentifier(controle) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(controle: IControle): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(controle);
    return this.http
      .patch<IControle>(`${this.resourceUrl}/${getControleIdentifier(controle) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IControle>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IControle[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addControleToCollectionIfMissing(controleCollection: IControle[], ...controlesToCheck: (IControle | null | undefined)[]): IControle[] {
    const controles: IControle[] = controlesToCheck.filter(isPresent);
    if (controles.length > 0) {
      const controleCollectionIdentifiers = controleCollection.map(controleItem => getControleIdentifier(controleItem)!);
      const controlesToAdd = controles.filter(controleItem => {
        const controleIdentifier = getControleIdentifier(controleItem);
        if (controleIdentifier == null || controleCollectionIdentifiers.includes(controleIdentifier)) {
          return false;
        }
        controleCollectionIdentifiers.push(controleIdentifier);
        return true;
      });
      return [...controlesToAdd, ...controleCollection];
    }
    return controleCollection;
  }

  protected convertDateFromClient(controle: IControle): IControle {
    return Object.assign({}, controle, {
      date: controle.date?.isValid() ? controle.date.format(DATE_FORMAT) : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.date = res.body.date ? dayjs(res.body.date) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((controle: IControle) => {
        controle.date = controle.date ? dayjs(controle.date) : undefined;
      });
    }
    return res;
  }
}
