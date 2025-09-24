import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsString, IsStrongPassword, MinLength } from "class-validator"
import { Role } from "../enums/role.enum"

export class CreateUsuarioDto{

    @IsString()
    @IsNumber()
    id: number

    @IsNotEmpty()
    @IsString()
    nome: string
    @IsNotEmpty()
    @IsEmail()
    email: string
    
    @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    }, {
    message: 'A senha deve ter no mínimo 8 caracteres, uma letra maiúscula, uma minúscula, um número e um símbolo.',
    })
    @IsNotEmpty()
    @MinLength(6)
    senha: string

    @IsNotEmpty()
    @IsEnum(Role, {message: ' role invalida'})
    role: Role

}