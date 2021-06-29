import { IControle } from 'app/entities/controle/controle.model';
import { IDiplome } from 'app/entities/diplome/diplome.model';

export interface IMatiere {
  id?: number;
  nameMat?: string | null;
  coefMat?: number | null;
  controles?: IControle[] | null;
  diplome?: IDiplome;
}

export class Matiere implements IMatiere {
  constructor(
    public id?: number,
    public nameMat?: string | null,
    public coefMat?: number | null,
    public controles?: IControle[] | null,
    public diplome?: IDiplome
  ) {}
}

export function getMatiereIdentifier(matiere: IMatiere): number | undefined {
  return matiere.id;
}
