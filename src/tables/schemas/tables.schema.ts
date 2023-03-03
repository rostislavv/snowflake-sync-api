import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TableDocument = HydratedDocument<Table>;

@Schema()
export class Table {
  @Prop(/* { unique: true } */)
  name: string;

  @Prop()
  schema: number;

  @Prop()
  columns: string;

  // other prosp TODO
}

export const TableSchema = SchemaFactory.createForClass(Table);
