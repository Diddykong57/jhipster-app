import { IDiplome } from 'app/entities/diplome/diplome.model';
import { IObtient } from 'app/entities/obtient/obtient.model';

export interface IEtudiant {
  id?: number;
  idEtud?: number;
  firstName?: string | null;
  lastName?: string | null;
  firstName?: IDiplome | null;
  idEtuds?: IObtient[] | null;
}

export class Etudiant implements IEtudiant {
  constructor(
    public id?: number,
    public idEtud?: number,
    public firstName?: string | null,
    public lastName?: string | null,
    public firstName?: IDiplome | null,
    public idEtuds?: IObtient[] | null
  ) {}
}

export function getEtudiantIdentifier(etudiant: IEtudiant): number | undefined {
  return etudiant.id;
}
