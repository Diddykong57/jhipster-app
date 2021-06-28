import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IObtient, getObtientIdentifier } from '../obtient.model';

export type EntityResponseType = HttpResponse<IObtient>;
export type EntityArrayResponseType = HttpResponse<IObtient[]>;

@Injectable({ providedIn: 'root' })
export class ObtientService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/obtients');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(obtient: IObtient): Observable<EntityResponseType> {
    return this.http.post<IObtient>(this.resourceUrl, obtient, { observe: 'response' });
  }

  update(obtient: IObtient): Observable<EntityResponseType> {
    return this.http.put<IObtient>(`${this.resourceUrl}/${getObtientIdentifier(obtient) as number}`, obtient, { observe: 'response' });
  }

  partialUpdate(obtient: IObtient): Observable<EntityResponseType> {
    return this.http.patch<IObtient>(`${this.resourceUrl}/${getObtientIdentifier(obtient) as number}`, obtient, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IObtient>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IObtient[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addObtientToCollectionIfMissing(obtientCollection: IObtient[], ...obtientsToCheck: (IObtient | null | undefined)[]): IObtient[] {
    const obtients: IObtient[] = obtientsToCheck.filter(isPresent);
    if (obtients.length > 0) {
      const obtientCollectionIdentifiers = obtientCollection.map(obtientItem => getObtientIdentifier(obtientItem)!);
      const obtientsToAdd = obtients.filter(obtientItem => {
        const obtientIdentifier = getObtientIdentifier(obtientItem);
        if (obtientIdentifier == null || obtientCollectionIdentifiers.includes(obtientIdentifier)) {
          return false;
        }
        obtientCollectionIdentifiers.push(obtientIdentifier);
        return true;
      });
      return [...obtientsToAdd, ...obtientCollection];
    }
    return obtientCollection;
  }
}
