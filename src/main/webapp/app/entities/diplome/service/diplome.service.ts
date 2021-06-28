import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IDiplome, getDiplomeIdentifier } from '../diplome.model';

export type EntityResponseType = HttpResponse<IDiplome>;
export type EntityArrayResponseType = HttpResponse<IDiplome[]>;

@Injectable({ providedIn: 'root' })
export class DiplomeService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/diplomes');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(diplome: IDiplome): Observable<EntityResponseType> {
    return this.http.post<IDiplome>(this.resourceUrl, diplome, { observe: 'response' });
  }

  update(diplome: IDiplome): Observable<EntityResponseType> {
    return this.http.put<IDiplome>(`${this.resourceUrl}/${getDiplomeIdentifier(diplome) as number}`, diplome, { observe: 'response' });
  }

  partialUpdate(diplome: IDiplome): Observable<EntityResponseType> {
    return this.http.patch<IDiplome>(`${this.resourceUrl}/${getDiplomeIdentifier(diplome) as number}`, diplome, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IDiplome>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDiplome[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addDiplomeToCollectionIfMissing(diplomeCollection: IDiplome[], ...diplomesToCheck: (IDiplome | null | undefined)[]): IDiplome[] {
    const diplomes: IDiplome[] = diplomesToCheck.filter(isPresent);
    if (diplomes.length > 0) {
      const diplomeCollectionIdentifiers = diplomeCollection.map(diplomeItem => getDiplomeIdentifier(diplomeItem)!);
      const diplomesToAdd = diplomes.filter(diplomeItem => {
        const diplomeIdentifier = getDiplomeIdentifier(diplomeItem);
        if (diplomeIdentifier == null || diplomeCollectionIdentifiers.includes(diplomeIdentifier)) {
          return false;
        }
        diplomeCollectionIdentifiers.push(diplomeIdentifier);
        return true;
      });
      return [...diplomesToAdd, ...diplomeCollection];
    }
    return diplomeCollection;
  }
}
