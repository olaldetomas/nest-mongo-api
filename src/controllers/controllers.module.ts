import { Module } from '@nestjs/common'
import { AuthServiceModule } from '../services/auth/auth.service.module'
import { UsersServiceModule } from '../services/users/users.service.module'
import { AuthController } from './auth.controller'
import { UsersController } from './users.controller'

@Module({
  controllers: [AuthController, UsersController],
  providers: [AuthController, UsersController],
  imports: [AuthServiceModule, UsersServiceModule],
  exports: [AuthController, UsersController],
})
export class ControllersModule {}
