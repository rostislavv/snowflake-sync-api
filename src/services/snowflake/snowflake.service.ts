import * as snowflake from 'snowflake-sdk';
import { Inject, Injectable } from '@nestjs/common';
import { SNOWFLAKE_OPTIONS } from './constants';
import { ConfigOptions } from './interfaces';

@Injectable()
export class SnowflakeService {
  private readonly connection: ReturnType<typeof snowflake.createConnection>;

  constructor(@Inject(SNOWFLAKE_OPTIONS) options: ConfigOptions) {
    console.log(options);
    this.connection = snowflake.createConnection(options);
    // Try to connect to Snowflake, and check whether the connection was successful.
    this.connection.connect(function (err, conn) {
      if (err) {
        throw new Error('Unable to connect to snowflake: ' + err.message);
      }
      console.log('Successfully connected!');
      /*
      // let's not hold connection - checked if was established and that's it
      conn.destroy((err, conn) => {
        if (err) {
          throw new Error('Unable to close connection: ' + err.message);
        }
        console.log('Successfully disconnected!');
      });
     */
    });
  }

  async execute(sql: string): Promise<any> {
    /*
    await this.connection.connectAsync(function (err, conn) {
      if (err) {
        // TODO - we need logger for this
        console.error(err);
        return;
      }
      console.log('Connected in execute');
    });
   */

    /*
      // execute a SQL statement to get metadata for a table
      const sql = `
    SELECT column_name, data_type, is_nullable, column_default
    FROM information_schema.columns
    WHERE table_name = '${tableName}'
  `;
 */

    const connectPromise = () =>
      new Promise((res, rej) => {
        this.connection.connect(function (err, conn) {
          if (err) {
            console.error('Unable to connect: ' + err.message);
            rej(err);
          }
          res(true);
        });
      });

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

    /*
      var stream = stmt.streamRows();
      requestId = stmt.getRequestId();   // Retrieves the request ID
      stream.on('data', function (row)
      {
        console.log(row);
      });
      stream.on('end', function (row)
      {
        console.log('done');
      });
     */

    return stmt.rows;
  }
}
