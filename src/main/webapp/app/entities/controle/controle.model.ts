import * as dayjs from 'dayjs';
import { IMatiere } from 'app/entities/matiere/matiere.model';
import { IObtient } from 'app/entities/obtient/obtient.model';
import { TypeControle } from 'app/entities/enumerations/type-controle.model';

export interface IControle {
  id?: number;
  date?: dayjs.Dayjs | null;
  coefCont?: number | null;
  type?: TypeControle | null;
  matiere?: IMatiere | null;
  obtients?: IObtient[] | null;
}

export class Controle implements IControle {
  constructor(
    public id?: number,
    public date?: dayjs.Dayjs | null,
    public coefCont?: number | null,
    public type?: TypeControle | null,
    public matiere?: IMatiere | null,
    public obtients?: IObtient[] | null
  ) {}
}

export function getControleIdentifier(controle: IControle): number | undefined {
  return controle.id;
}
