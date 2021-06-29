import { IEtudiant } from 'app/entities/etudiant/etudiant.model';

export interface IDiplome {
  id?: number;
  nameDipl?: string | null;
  etudiant?: IEtudiant;
}

export class Diplome implements IDiplome {
  constructor(public id?: number, public nameDipl?: string | null, public etudiant?: IEtudiant) {}
}

export function getDiplomeIdentifier(diplome: IDiplome): number | undefined {
  return diplome.id;
}
