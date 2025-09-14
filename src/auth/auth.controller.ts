import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
constructor(private authService: AuthService) {}

  @Post('login')
  @UsePipes(ValidationPipe) // Garante que o DTO será validado
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(
      loginDto.email,
      loginDto.senha,
    );
    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas.');
    }
    return this.authService.login(user);
  }
}
