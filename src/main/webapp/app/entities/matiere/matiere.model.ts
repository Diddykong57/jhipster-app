import { IControle } from 'app/entities/controle/controle.model';
import { TypeMatiere } from 'app/entities/enumerations/type-matiere.model';

export interface IMatiere {
  id?: number;
  nameMat?: TypeMatiere | null;
  coefMat?: number | null;
  controle?: IControle | null;
}

export class Matiere implements IMatiere {
  constructor(
    public id?: number,
    public nameMat?: TypeMatiere | null,
    public coefMat?: number | null,
    public controle?: IControle | null
  ) {}
}

export function getMatiereIdentifier(matiere: IMatiere): number | undefined {
  return matiere.id;
}
