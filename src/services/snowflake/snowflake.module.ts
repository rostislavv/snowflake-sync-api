import { Global, DynamicModule, Module, Provider } from '@nestjs/common';

import { SnowflakeService } from './snowflake.service';
import { SNOWFLAKE_OPTIONS, SNOWFLAKE_SERVICE_TOKEN } from './constants';
import { SnowflakeModuleAsyncOptions, ConfigOptions } from './interfaces';

export const getSnowflakeService = (options: ConfigOptions): SnowflakeService =>
  new SnowflakeService(options);

@Global()
@Module({})
export class SnowflakeModule {
  static forRootAsync(options: SnowflakeModuleAsyncOptions): DynamicModule {
    const provider: Provider = {
      inject: [SNOWFLAKE_OPTIONS],
      provide: SNOWFLAKE_SERVICE_TOKEN,
      useFactory: async (options: ConfigOptions) =>
        getSnowflakeService(options),
    };

    return {
      module: SnowflakeModule,
      imports: options.imports,
      providers: [...this.createAsyncProviders(options), provider],
      exports: [provider],
    };
  }
  private static createAsyncProviders(
    options: SnowflakeModuleAsyncOptions,
  ): Provider[] {
    return [this.createAsyncOptionsProvider(options)];
  }

  private static createAsyncOptionsProvider(
    options: SnowflakeModuleAsyncOptions,
  ): Provider {
    return {
      provide: SNOWFLAKE_OPTIONS,
      useFactory: options.useFactory,
      inject: options.inject || [],
    };
  }
}
