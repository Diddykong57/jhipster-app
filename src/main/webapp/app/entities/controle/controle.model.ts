import * as dayjs from 'dayjs';
import { IObtient } from 'app/entities/obtient/obtient.model';
import { ContType } from 'app/entities/enumerations/cont-type.model';

export interface IControle {
  id?: number;
  date?: dayjs.Dayjs | null;
  coefCont?: number | null;
  type?: ContType | null;
  obtients?: IObtient[] | null;
}

export class Controle implements IControle {
  constructor(
    public id?: number,
    public date?: dayjs.Dayjs | null,
    public coefCont?: number | null,
    public type?: ContType | null,
    public obtients?: IObtient[] | null
  ) {}
}

export function getControleIdentifier(controle: IControle): number | undefined {
  return controle.id;
}
