import { IControle } from 'app/entities/controle/controle.model';
import { IEtudiant } from 'app/entities/etudiant/etudiant.model';

export interface IObtient {
  id?: number;
  note?: number;
  controle?: IControle | null;
  etudiant?: IEtudiant | null;
}

export class Obtient implements IObtient {
  constructor(public id?: number, public note?: number, public controle?: IControle | null, public etudiant?: IEtudiant | null) {}
}

export function getObtientIdentifier(obtient: IObtient): number | undefined {
  return obtient.id;
}
