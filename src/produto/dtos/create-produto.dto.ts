import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, MaxLength } from "class-validator";
import { CategoriaProduto } from "../entities/produto.entity";

export class CreateProdutoDto {
  @IsString({ message: 'O nome deve ser uma string.' })
  @IsNotEmpty({ message: 'O nome não pode ser vazio.' })
  @MaxLength(200, { message: 'O nome não pode ter mais de 200 caracteres.' })
  nome: string;

  @IsString()
  @IsOptional() // A descrição é opcional
  descricao?: string;

  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'O preço deve ser um número com no máximo duas casas decimais.' },
  )
  @IsPositive({ message: 'O preço deve ser um número positivo.' })
  preco: number;

  @IsEnum(CategoriaProduto, {
    message: `A categoria deve ser uma das seguintes: ${Object.values(
      CategoriaProduto,
    ).join(', ')}`,
  })
  categoria: CategoriaProduto;
}