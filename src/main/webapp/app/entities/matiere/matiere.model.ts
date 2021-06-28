import { IDiplome } from 'app/entities/diplome/diplome.model';

export interface IMatiere {
  id?: number;
  idMat?: number;
  nameMat?: string | null;
  coefMat?: number | null;
  nameMat?: IDiplome | null;
}

export class Matiere implements IMatiere {
  constructor(
    public id?: number,
    public idMat?: number,
    public nameMat?: string | null,
    public coefMat?: number | null,
    public nameMat?: IDiplome | null
  ) {}
}

export function getMatiereIdentifier(matiere: IMatiere): number | undefined {
  return matiere.id;
}
