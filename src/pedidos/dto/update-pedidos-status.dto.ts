import { IsEnum, IsNotEmpty } from 'class-validator';
import { StatusPedido } from '../entities/pedido.entity';

export class UpdatePedidoStatusDto {
  @IsEnum(StatusPedido)
  @IsNotEmpty()
  status: StatusPedido;
}