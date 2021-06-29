import { IDiplome } from 'app/entities/diplome/diplome.model';
import { IObtient } from 'app/entities/obtient/obtient.model';

export interface IEtudiant {
  id?: number;
  firstName?: string | null;
  lastName?: string | null;
  diplome?: IDiplome | null;
  obtients?: IObtient[] | null;
}

export class Etudiant implements IEtudiant {
  constructor(
    public id?: number,
    public firstName?: string | null,
    public lastName?: string | null,
    public diplome?: IDiplome | null,
    public obtients?: IObtient[] | null
  ) {}
}

export function getEtudiantIdentifier(etudiant: IEtudiant): number | undefined {
  return etudiant.id;
}
