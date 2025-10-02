import { Injectable, NotFoundException, Logger,OnModuleInit} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Repository } from 'typeorm';
import { CreateUsuarioDto } from './dtos/Create-usuario.dto';
import * as bcrypt from 'bcrypt';
import { UpdateUsuarioDto } from './dtos/update-usuario.dto';
import { UsuarioResponseDto } from './dtos/usuario-response.dto';
import { Role } from './enums/role.enum';

@Injectable()
export class UsuarioService {
    private readonly logger = new Logger(UsuarioService.name);
    constructor( 
        @InjectRepository(Usuario)
        private readonly usuarioRepository: Repository<Usuario> ){}

        async create( createUsuarioDto: CreateUsuarioDto): Promise<UsuarioResponseDto>{
           const senhaHash = await bcrypt.hash(createUsuarioDto.senha,10)

           const novoUsuario = this.usuarioRepository.create({
            ...createUsuarioDto,
            senha: senhaHash,
           })

           const usuarioSalvo = await this.usuarioRepository.save(novoUsuario)
           const { senha, hashPassword, ...result } = usuarioSalvo
           return result
         }

         async findAll(): Promise <UsuarioResponseDto[]>{
            const usuario = await this.usuarioRepository.find()
            return usuario.map(({senha, ...result}) => result)
         }

         async findOne(id: number): Promise<UsuarioResponseDto>{
            const usuario = await this.usuarioRepository.findOneBy({id});
             if (!usuario){
               throw new NotFoundException (`usuario não achado ${id}`)
             }
             const { senha, ...result} = usuario;
             return result;
            }
         async findOneByEmail(email: string): Promise<Usuario | undefined> {
            return this.usuarioRepository.findOneBy({ email });
             }

         async update(id: number, updateUsuarioDto: UpdateUsuarioDto): Promise<UsuarioResponseDto>{
            if(updateUsuarioDto.senha){
               updateUsuarioDto.senha = await bcrypt.hash(updateUsuarioDto.senha,10)
            }
            const usuario = await this.usuarioRepository.preload({
               id: id,
               ...UpdateUsuarioDto,
            })
            if(!usuario){
               throw new NotFoundException (`usuario não achado ${id}`)

            }
            return this.usuarioRepository.save(usuario);
         }

         async remove( id: number): Promise<void>{
            const usuario = await this.findOne(id)
            await this.usuarioRepository.remove(usuario as  Usuario)
         }
}

