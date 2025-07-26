import { CreateUsuarioDto } from "./Create-usuario.dto";
import { PartialType } from "@nestjs/mapped-types";
export class UpdateUsuarioDto extends PartialType(CreateUsuarioDto){

}