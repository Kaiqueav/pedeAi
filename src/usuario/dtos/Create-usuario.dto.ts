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

    @IsNotEmpty()
    @MinLength(6)
    senha: string

    @IsNotEmpty()
    @IsEnum(Role, {message: ' role invalida'})
    role: Role

}