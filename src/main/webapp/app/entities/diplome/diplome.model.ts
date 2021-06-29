import { IEtudiant } from 'app/entities/etudiant/etudiant.model';
import { IMatiere } from 'app/entities/matiere/matiere.model';

export interface IDiplome {
  id?: number;
  nameDipl?: string | null;
  etudiants?: IEtudiant[] | null;
  matiere?: IMatiere;
}

export class Diplome implements IDiplome {
  constructor(public id?: number, public nameDipl?: string | null, public etudiants?: IEtudiant[] | null, public matiere?: IMatiere) {}
}

export function getDiplomeIdentifier(diplome: IDiplome): number | undefined {
  return diplome.id;
}
