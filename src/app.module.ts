import { Module } from '@nestjs/common'
import { ConfigModule } from './config/config.module'
import { APP_GUARD } from './constants'
import { ControllersModule } from './controllers/controllers.module'
import { JwtAuthGuard } from './guards/jwt-auth.guard'
import { AuthServiceModule } from './services/auth/auth.service.module'
import { UsersServiceModule } from './services/users/users.service.module'

@Module({
  imports: [
    ConfigModule,
    ControllersModule,
    AuthServiceModule,
    UsersServiceModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
