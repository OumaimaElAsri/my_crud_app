// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlatsModule } from './plats/plats.module';
import { ClientsModule } from './clients/clients.module';
import { TablesModule } from './tables/tables.module';
import { ReservationsModule } from './reservations/reservations.module';
import { CommandesModule } from './commandes/commandes.module';
import { Client } from './entities/client.entity';
import { Plat } from './entities/plat.entity';
import { Table } from './entities/table.entity';
import { Reservation } from './entities/reservation.entity';
import { Commande } from './entities/commande.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [Client, Plat, Table, Reservation, Commande],
        synchronize: configService.get('NODE_ENV') !== 'production',
      }),
      inject: [ConfigService],
    }),
    PlatsModule,
    ClientsModule,
    TablesModule,
    ReservationsModule,
    CommandesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
