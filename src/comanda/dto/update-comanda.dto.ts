import { PartialType } from '@nestjs/mapped-types';
import { IsEnum, IsOptional } from 'class-validator';
import { StatusComanda } from '../entities/comanda.entity';


export class UpdateComandaDto {
    @IsEnum(StatusComanda, {
    message: `O status deve ser um dos seguintes: ${Object.values(
      StatusComanda,
    ).join(', ')}`,
  })
  @IsOptional()
  status?: StatusComanda;
}
