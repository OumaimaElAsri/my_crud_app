// src/plats/plats.controller.ts
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { PlatsService } from './plats.service';
import { Plat } from '../entities/plat.entity';

@Controller('plats')
export class PlatsController {
  constructor(private readonly platsService: PlatsService) {}

  @Get()
  findAll(): Promise<Plat[]> {
    return this.platsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Plat> {
    return this.platsService.findOne(Number(id));
  }

  @Post()
  create(
    @Body()
    body: {
      nom: string;
      prix: number;
      description: string;
      allergenes: string[];
      vegetarien: boolean;
    },
  ): Promise<Plat> {
    return this.platsService.create(
      body.nom,
      body.prix,
      body.description,
      body.allergenes,
      body.vegetarien,
    );
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body()
    body: {
      nom?: string;
      prix?: number;
      description?: string;
      allergenes?: string[];
      vegetarien?: boolean;
    },
  ): Promise<Plat> {
    return this.platsService.update(
      Number(id),
      body.nom,
      body.prix,
      body.description,
      body.allergenes,
      body.vegetarien,
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.platsService.remove(Number(id));
    return { message: `Plat #${id} supprimé` };
  }
}
