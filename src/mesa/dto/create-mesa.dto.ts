import { IsNotEmpty } from "class-validator";

export class CreateMesaDto {
    @IsNotEmpty()
    numero: number
}
