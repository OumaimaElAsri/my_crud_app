// src/plats/plats.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Plat } from '../entities/plat.entity';

@Injectable()
export class PlatsService {
  constructor(
    @InjectRepository(Plat)
    private readonly platRepository: Repository<Plat>,
  ) {}

  findAll(): Promise<Plat[]> {
    return this.platRepository.find();
  }

  async findOne(id: number): Promise<Plat> {
    const plat = await this.platRepository.findOne({ where: { id } });
    if (!plat) throw new NotFoundException(`Plat #${id} non trouvé`);
    return plat;
  }

  async create(
    nom: string,
    prix: number,
    description: string,
    allergenes: string[],
    vegetarien: boolean,
  ): Promise<Plat> {
    const nouveauPlat = this.platRepository.create({
      nom,
      prix,
      description,
      allergenes: allergenes || [],
      vegetarien: vegetarien || false,
    });
    return this.platRepository.save(nouveauPlat);
  }

  async update(
    id: number,
    nom?: string,
    prix?: number,
    description?: string,
    allergenes?: string[],
    vegetarien?: boolean,
  ): Promise<Plat> {
    const plat = await this.findOne(id);
    if (nom !== undefined) plat.nom = nom;
    if (prix !== undefined) plat.prix = prix;
    if (description !== undefined) plat.description = description;
    if (allergenes !== undefined) plat.allergenes = allergenes;
    if (vegetarien !== undefined) plat.vegetarien = vegetarien;
    return this.platRepository.save(plat);
  }

  async remove(id: number): Promise<void> {
    const plat = await this.findOne(id);
    await this.platRepository.remove(plat);
  }
}
