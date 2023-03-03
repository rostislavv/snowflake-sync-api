import { ModuleMetadata } from '@nestjs/common';

export interface SnowflakeModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  connectionName?: string;
  useFactory?: (...args: any[]) => Promise<ConfigOptions> | ConfigOptions;
  inject?: any[];
}

export interface ConfigOptions {
  account: string;
  username: string;
  password: string;
  application: string;
}
