import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/Userdto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly AuthService: AuthService) {}
  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.AuthService.create(createUserDto);
  }
  @Post('signin')
  signIn(@Body() createUserDto: CreateUserDto) {
    return this.AuthService.signIn(createUserDto);
  }
}
