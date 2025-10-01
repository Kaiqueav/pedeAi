import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './usuario/usuario.module';
import { ProdutoController } from './produto/produto.controller';
import { ProdutoService } from './produto/produto.service';
import { ProdutoModule } from './produto/produto.module';
import { MesaModule } from './mesa/mesa.module';
import { ComandaModule } from './comanda/comanda.module';
import { PedidosModule } from './pedidos/pedidos.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { EventsModule } from './events/events.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
      url: configService.get<string>('DATABASE_URL'), 
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: false,
        ssl: {
          rejectUnauthorized: false 
        } 
      }),
    }),
    UsuarioModule,
     ProdutoModule, 
     MesaModule, 
     ComandaModule, 
     PedidosModule,
     AuthModule,
     EventsModule,
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
