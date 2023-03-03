import { Table } from '../schemas/tables.schema';

export class CreateTableDto implements Table {
  readonly name: string;
  readonly schema: number;
  readonly columns: string;
}
