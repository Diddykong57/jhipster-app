export interface IDiplome {
  id?: number;
  idDipl?: number;
  nameDipl?: string | null;
}

export class Diplome implements IDiplome {
  constructor(public id?: number, public idDipl?: number, public nameDipl?: string | null) {}
}

export function getDiplomeIdentifier(diplome: IDiplome): number | undefined {
  return diplome.id;
}
