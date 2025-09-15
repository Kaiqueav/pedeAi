import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { UsuarioService } from 'src/usuario/usuario.service';

@Injectable()
export class AuthService {

  constructor(private usuarioService: UsuarioService, private jwtService: JwtService){}

 async validateUser(email: string, pass: string): Promise<Omit<Usuario, 'senha' | 'hashPassword'>> {
    const user = await this.usuarioService.findOneByEmail(email);
    if (user && (await bcrypt.compare(pass, user.senha))) {
      const { senha, hashPassword, ...result } = user;
      return result;
    }
    return null;
  }

    async login(user: any) {
    const payload = { sub: user.id, email: user.email, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
