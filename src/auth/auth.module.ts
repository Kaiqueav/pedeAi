import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
  // 3. Adicionar os módulos à lista de imports
  imports: [
    UsuarioModule, // Disponibiliza o UsuarioService
    PassportModule,
    ConfigModule, // Disponibiliza o ConfigService para injeção
    JwtModule.registerAsync({
      imports: [ConfigModule], // Garante que o ConfigService está disponível para esta factory
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const secret = configService.get<string>('JWT_SECRET');
        if (!secret) {
          throw new Error('A variável de ambiente JWT_SECRET não está definida!');
        }
        return {
          secret: secret,
          signOptions: { expiresIn: '1d' }, // O token expira em 1 dia
        };
      },
    }),
  ],
  controllers: [AuthController],
  // 4. Declarar os providers do módulo
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
