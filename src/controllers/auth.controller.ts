import {
  Controller,
  Get,
  Post,
  Request,
  Response,
  UseGuards,
} from '@nestjs/common'
import { AuthService } from '../services/auth/auth.service'
import { LocalAuthGuard } from '../guards/local-auth.guard'
import { Public } from '../decorators/public.decorator'

@Public()
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req) {
    return await this.authService.login(req.user)
  }

  @Get('/google')
  async googleAuth(@Request() req) {
    // Guard redirects
  }

  @Get('google/redirect')
  async googleAuthRedirect(@Request() req, @Response() res) {
    // For now, we'll just show the user object
    return req.user
  }
}
