import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';

import { configModuleOptions } from './configs/module-options';
import { AllExceptionsFilter } from './filters/all-exceptions.filter';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { AppLoggerModule } from './logger/logger.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot(configModuleOptions),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.getOrThrow<string>('DB_URI'),
      }),
    }),
    // TypeOrmModule.forRootAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: async (configService: ConfigService) => ({
    //     type: 'postgres',
    //     ...(!configService.get<string>('database.uri')
    //       ? {
    //           host: configService.get<string>('database.host'),
    //           port: configService.get<number | undefined>('database.port'),
    //           database: configService.get<string>('database.name'),
    //           username: configService.get<string>('database.user'),
    //           password: configService.get<string>('database.pass'),
    //         }
    //       : { url: configService.get<string>('database.uri') }),
    //     schemas: [__dirname + '/../**/schemas/*.entity{.ts,.js}'],
    //     // Timezone configured on the Postgres server.
    //     // This is used to typecast server date/time values to JavaScript Date object and vice versa.
    //     timezone: 'UTC',
    //     ssl: process.env.APP_ENV !== 'development',
    //     extra: process.env.APP_ENV !== 'development' && {
    //       ssl: {
    //         rejectUnauthorized: false,
    //       },
    //     },
    //     synchronize: false,
    //     debug: configService.get<string>('env') === 'development',
    //   }),
    // }),
    AppLoggerModule,
  ],
  exports: [AppLoggerModule, ConfigModule],
  providers: [
    { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class SharedModule {}
