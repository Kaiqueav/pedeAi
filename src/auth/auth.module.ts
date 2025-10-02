import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { JwtAuthGuard } from './guards/jwt-auth.guards';
import { RolesGuard } from './guards/roles.guards';

@Module({

  imports: [
    UsuarioModule, 
    PassportModule,
    ConfigModule, 
    JwtModule.registerAsync({
      imports: [ConfigModule], 
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const secret = configService.get<string>('JWT_SECRET');
        if (!secret) {
          throw new Error('A variável de ambiente JWT_SECRET não está definida!');
        }
        return {
          secret: secret,
          signOptions: { expiresIn: '1d' }, 
        };
      },
    }),
  ],
  controllers: [AuthController],
  // 4. Declarar os providers do módulo
  providers: [AuthService, JwtStrategy, JwtAuthGuard, RolesGuard],
})
export class AuthModule {}
