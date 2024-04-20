import { Module } from '@nestjs/common';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { TaskModule } from './modules/task/task.module';

@Module({
  imports: [SharedModule, AuthModule, UserModule, TaskModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
