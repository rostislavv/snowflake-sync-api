import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TableDocument = HydratedDocument<Table>;

@Schema()
class Table {
  @Prop(/* { unique: true } */)
  TABLE_CATALOG: string;

  @Prop({ required: true })
  TABLE_SCHEMA: string;

  @Prop({ required: true })
  TABLE_NAME: string;

  @Prop({ required: true })
  COLUMN_NAME: string;

  @Prop()
  ORDINAL_POSITION: number;

  @Prop()
  COLUMN_DEFAULT: string;

  @Prop()
  IS_NULLABLE: string;

  @Prop({ required: true })
  DATA_TYPE: string;

  @Prop()
  CHARACTER_MAXIMUM_LENGTH: string;

  @Prop()
  CHARACTER_OCTET_LENGTH: string;

  @Prop()
  NUMERIC_PRECISION: number;

  @Prop()
  NUMERIC_PRECISION_RADIX: number;

  @Prop()
  NUMERIC_SCALE: number;

  @Prop()
  DATETIME_PRECISION: string;

  @Prop()
  INTERVAL_TYPE: string;

  @Prop()
  INTERVAL_PRECISION: string;

  @Prop()
  CHARACTER_SET_CATALOG: string;

  @Prop()
  CHARACTER_SET_SCHEMA: string;

  @Prop()
  CHARACTER_SET_NAME: string;

  @Prop()
  COLLATION_CATALOG: string;

  @Prop()
  COLLATION_SCHEMA: string;

  @Prop()
  COLLATION_NAME: string;

  @Prop()
  DOMAIN_CATALOG: string;

  @Prop()
  DOMAIN_SCHEMA: string;

  @Prop()
  DOMAIN_NAME: string;

  @Prop()
  UDT_CATALOG: string;

  @Prop()
  UDT_SCHEMA: string;

  @Prop()
  UDT_NAME: string;

  @Prop()
  SCOPE_CATALOG: string;

  @Prop()
  SCOPE_SCHEMA: string;

  @Prop()
  SCOPE_NAME: string;

  @Prop()
  MAXIMUM_CARDINALITY: string;

  @Prop()
  DTD_IDENTIFIER: string;

  @Prop()
  IS_SELF_REFERENCING: string;

  @Prop()
  IS_IDENTITY: string;

  @Prop()
  IDENTITY_GENERATION: string;

  @Prop()
  IDENTITY_START: string;

  @Prop()
  IDENTITY_INCREMENT: string;

  @Prop()
  IDENTITY_MAXIMUM: string;

  @Prop()
  IDENTITY_MINIMUM: string;

  @Prop()
  IDENTITY_CYCLE: string;

  @Prop()
  COMMENT: string;
}

const TableSchema = SchemaFactory.createForClass(Table);
TableSchema.index(
  { TABLE_SCHEMA: 1, TABLE_NAME: 1, COLUMN_NAME: 1 },
  { unique: true },
);

export { TableSchema, Table };
