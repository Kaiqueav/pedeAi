import { IsInt, IsNotEmpty, IsOptional, IsPositive, IsString, IsUUID } from 'class-validator';

export class ItemPedidoDto {
  @IsUUID()
  @IsNotEmpty()
  produtoId: string;

  @IsInt()
  @IsPositive()
  quantidade: number;

  @IsString()
  @IsOptional()
  observacao?: string;
}