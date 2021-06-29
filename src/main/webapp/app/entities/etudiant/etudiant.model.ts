import { IObtient } from 'app/entities/obtient/obtient.model';
import { IDiplome } from 'app/entities/diplome/diplome.model';

export interface IEtudiant {
  id?: number;
  firstName?: string | null;
  lastName?: string | null;
  obtients?: IObtient[] | null;
  diplome?: IDiplome;
}

export class Etudiant implements IEtudiant {
  constructor(
    public id?: number,
    public firstName?: string | null,
    public lastName?: string | null,
    public obtients?: IObtient[] | null,
    public diplome?: IDiplome
  ) {}
}

export function getEtudiantIdentifier(etudiant: IEtudiant): number | undefined {
  return etudiant.id;
}
