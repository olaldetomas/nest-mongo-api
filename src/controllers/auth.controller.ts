import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common'
import { Public } from '../decorators/public.decorator'
import { GoogleOauthGuard } from '../guards/google-auth.guard'
import { LocalAuthGuard } from '../guards/local-auth.guard'
import { AuthService } from '../services/auth/auth.service'

@Public()
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  @UseGuards(LocalAuthGuard)
  async login(@Request() req) {
    return await this.authService.login(req.user)
  }

  @Get('/google')
  @UseGuards(GoogleOauthGuard)
  async googleAuth(@Request() req) {
    // Guard redirects
  }

  @Get('/google/redirect')
  @UseGuards(GoogleOauthGuard)
  async googleAuthRedirect(@Request() req) {
    return await this.authService.login(req.user)
  }
}
