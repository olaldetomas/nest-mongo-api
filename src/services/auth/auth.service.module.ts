import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { ConfigModule } from '../../config/config.module'
import { DEFAULT_JWT_SECRET } from '../../constants'
import { UsersServiceModule } from '../users/users.service.module'
import { AuthService } from './auth.service'
import { JwtStrategy } from './strategies/jwt.strategy'
import { LocalStrategy } from './strategies/local.strategy'

@Module({
  imports: [
    ConfigModule,
    UsersServiceModule,
    PassportModule,
    JwtModule.register({
      secret: DEFAULT_JWT_SECRET,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthServiceModule {}
