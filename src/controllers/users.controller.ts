import { Controller, Get, Request, Response, UseGuards } from '@nestjs/common'
import { Public } from '../decorators/public.decorator'
import { JwtAuthGuard } from '../guards/jwt-auth.guard'

@Controller('users')
export class UsersController {
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user
  }

  @Public()
  @Get('public/profile')
  getPublicProfile(@Request() req, @Response() res) {
    res.status(200).json('asd')
  }
}
