import { IControle } from 'app/entities/controle/controle.model';

export interface IMatiere {
  id?: number;
  nameMat?: string | null;
  coefMat?: number | null;
  controle?: IControle | null;
}

export class Matiere implements IMatiere {
  constructor(public id?: number, public nameMat?: string | null, public coefMat?: number | null, public controle?: IControle | null) {}
}

export function getMatiereIdentifier(matiere: IMatiere): number | undefined {
  return matiere.id;
}