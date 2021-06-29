import * as dayjs from 'dayjs';
import { IObtient } from 'app/entities/obtient/obtient.model';
import { IMatiere } from 'app/entities/matiere/matiere.model';
import { TypeControle } from 'app/entities/enumerations/type-controle.model';

export interface IControle {
  id?: number;
  date?: dayjs.Dayjs | null;
  coefCont?: number | null;
  type?: TypeControle | null;
  obtients?: IObtient[] | null;
  matiere?: IMatiere;
}

export class Controle implements IControle {
  constructor(
    public id?: number,
    public date?: dayjs.Dayjs | null,
    public coefCont?: number | null,
    public type?: TypeControle | null,
    public obtients?: IObtient[] | null,
    public matiere?: IMatiere
  ) {}
}

export function getControleIdentifier(controle: IControle): number | undefined {
  return controle.id;
}
