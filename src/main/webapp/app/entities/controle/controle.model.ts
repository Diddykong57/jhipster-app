import * as dayjs from 'dayjs';
import { IMatiere } from 'app/entities/matiere/matiere.model';
import { IObtient } from 'app/entities/obtient/obtient.model';

export interface IControle {
  id?: number;
  idCont?: number;
  date?: dayjs.Dayjs | null;
  coefCont?: number | null;
  type?: string | null;
  idCont?: IMatiere | null;
  idConts?: IObtient[] | null;
}

export class Controle implements IControle {
  constructor(
    public id?: number,
    public idCont?: number,
    public date?: dayjs.Dayjs | null,
    public coefCont?: number | null,
    public type?: string | null,
    public idCont?: IMatiere | null,
    public idConts?: IObtient[] | null
  ) {}
}

export function getControleIdentifier(controle: IControle): number | undefined {
  return controle.id;
}
