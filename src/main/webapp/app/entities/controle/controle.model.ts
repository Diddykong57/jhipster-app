import * as dayjs from 'dayjs';
import { IObtient } from 'app/entities/obtient/obtient.model';
import { TypeControle } from 'app/entities/enumerations/type-controle.model';

export interface IControle {
  id?: number;
  date?: dayjs.Dayjs | null;
  coefCont?: number | null;
  type?: TypeControle | null;
  obtients?: IObtient[] | null;
}

export class Controle implements IControle {
  constructor(
    public id?: number,
    public date?: dayjs.Dayjs | null,
    public coefCont?: number | null,
    public type?: TypeControle | null,
    public obtients?: IObtient[] | null
  ) {}
}

export function getControleIdentifier(controle: IControle): number | undefined {
  return controle.id;
}
