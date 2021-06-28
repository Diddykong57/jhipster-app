import { IObtient } from 'app/entities/obtient/obtient.model';

export interface IEtudiant {
  id?: number;
  firstName?: string | null;
  lastName?: string | null;
  obtients?: IObtient[] | null;
}

export class Etudiant implements IEtudiant {
  constructor(public id?: number, public firstName?: string | null, public lastName?: string | null, public obtients?: IObtient[] | null) {}
}

export function getEtudiantIdentifier(etudiant: IEtudiant): number | undefined {
  return etudiant.id;
}
