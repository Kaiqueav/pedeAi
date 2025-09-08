import { Type } from "class-transformer";
import { IsArray, IsInt, IsNotEmpty, IsPositive, ValidateNested } from "class-validator";
import { ItemPedidoDto } from "./item-pedidos.dto";

export class CreatePedidoDto {
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  mesaId: number;

  @IsArray()
  @ValidateNested({ each: true }) // Valida cada objeto dentro do array
  @Type(() => ItemPedidoDto) // Especifica o tipo do objeto no array
  itens: ItemPedidoDto[];
}
