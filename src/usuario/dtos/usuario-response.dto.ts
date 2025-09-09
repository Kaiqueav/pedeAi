import { Role } from "../enums/role.enum";

export class UsuarioResponseDto {
  id: number;
  nome: string;
  email: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}