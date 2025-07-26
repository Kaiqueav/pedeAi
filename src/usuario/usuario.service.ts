import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Repository } from 'typeorm';
import { CreateUsuarioDto } from './dtos/Create-usuario.dto';
import * as bcrypt from 'bcrypt';
import { UpdateUsuarioDto } from './dtos/update-usuario.dto';

@Injectable()
export class UsuarioService {
    
    constructor( 
        @InjectRepository(Usuario)
        private readonly usuarioRepository: Repository<Usuario> ){}

        async create( createUsuarioDto: CreateUsuarioDto): Promise<Omit<Usuario, 'senha'>>{
           const senhaHash = await bcrypt.hash(createUsuarioDto.senha,10)

           const usuario = this.usuarioRepository.create({
            ...createUsuarioDto,
            senha: senhaHash,
           })

           const usuarioSalvo = await this.usuarioRepository.save(usuario)
           const { senha, ...result } = usuarioSalvo
           return result
         }

         async findAll(): Promise <Omit<Usuario, 'senha'>[]>{
            const usuario = await this.usuarioRepository.find()
            return usuario.map(({senha, ...result}) => result)
         }

         async findOne(id: number): Promise<Omit<Usuario, 'senha'>>{
            const usuario = await this.usuarioRepository.findOneBy({id});
             if (!usuario){
               throw new NotFoundException (`usuario não achado ${id}`)
             }
             const { senha, ...result} = usuario;
             return result;
            }

         async update(id: number, updateUsuarioDto: UpdateUsuarioDto): Promise<Omit<Usuario, 'senha'>>{
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

