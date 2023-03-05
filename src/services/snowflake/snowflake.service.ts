import * as snowflake from 'snowflake-sdk';
import { Inject, Injectable } from '@nestjs/common';
import { SNOWFLAKE_OPTIONS } from './constants';
import { ConfigOptions } from './interfaces';

@Injectable()
export class SnowflakeService {
  private readonly connection: ReturnType<typeof snowflake.createConnection>;

  constructor(@Inject(SNOWFLAKE_OPTIONS) options: ConfigOptions) {
    this.connection = snowflake.createConnection(options);
    // Try to connect to Snowflake, and check whether the connection was successful.
    this.connection.connect(function (err, conn) {
      if (err) {
        throw new Error('Unable to connect to snowflake: ' + err.message);
      }
      // TODO - logger instance needed :)
      console.log('Successfully connected!');
    });
  }

  async execute(sql: string): Promise<any> {
    const executePromise = (): Promise<{ stmt; rows }> =>
      new Promise((res, rej) => {
        this.connection.execute({
          sqlText: sql,
          complete: (err, stmt, rows) => {
            if (err) {
              rej(err);
            }
            res({ stmt, rows });
          },
        });
      });

    const stmt = await executePromise();
    return stmt.rows;
  }
}
