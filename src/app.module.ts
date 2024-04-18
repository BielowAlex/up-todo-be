import { Module } from '@nestjs/common';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [SharedModule, AuthModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
