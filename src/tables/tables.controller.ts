// src/tables/tables.controller.ts
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { TablesService } from './tables.service';
import { Table, StatutTable } from '../entities/table.entity';

@Controller('tables')
export class TablesController {
  constructor(private readonly tablesService: TablesService) {}

  @Get()
  findAll(): Promise<Table[]> {
    return this.tablesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Table> {
    return this.tablesService.findOne(Number(id));
  }

  @Post()
  create(
    @Body()
    body: {
      capacite: number;
      statut?: StatutTable;
    },
  ): Promise<Table> {
    return this.tablesService.create(body.capacite, body.statut);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body()
    body: {
      capacite?: number;
      statut?: StatutTable;
    },
  ): Promise<Table> {
    return this.tablesService.update(Number(id), body.capacite, body.statut);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.tablesService.remove(Number(id));
    return { message: `Table #${id} supprimée` };
  }
}
