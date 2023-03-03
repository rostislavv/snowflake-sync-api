import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { SnowflakeModule } from './services/snowflake/snowflake.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TablesModule } from './tables/tables.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    SnowflakeModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        account: configService.get<string>('SNOWFLAKE_ACCOUNT'),
        username: configService.get<string>('SNOWFLAKE_USERNAME'),
        password: configService.get<string>('SNOWFLAKE_PASSWORD'),
        application: configService.get<string>('SNOWFLAKE_APPLICATION'),
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URL'),
      }),
      inject: [ConfigService],
    }),
    TablesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
