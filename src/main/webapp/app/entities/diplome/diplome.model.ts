export interface IDiplome {
  id?: number;
  nameDipl?: string | null;
}

export class Diplome implements IDiplome {
  constructor(public id?: number, public nameDipl?: string | null) {}
}

export function getDiplomeIdentifier(diplome: IDiplome): number | undefined {
  return diplome.id;
}
