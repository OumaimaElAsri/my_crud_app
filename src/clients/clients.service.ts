// src/clients/clients.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from '../entities/client.entity';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
  ) {}

  findAll(): Promise<Client[]> {
    return this.clientRepository.find();
  }

  async findOne(id: number): Promise<Client> {
    const client = await this.clientRepository.findOne({ where: { id } });
    if (!client) throw new NotFoundException(`Client #${id} non trouvé`);
    return client;
  }

  async create(
    nom: string,
    allergies: string[],
    majeur: boolean,
    vegetarien: boolean,
  ): Promise<Client> {
    const nouveauClient = this.clientRepository.create({
      nom,
      allergies: allergies || [],
      majeur: majeur || false,
      vegetarien: vegetarien || false,
    });
    return this.clientRepository.save(nouveauClient);
  }

  async update(
    id: number,
    nom?: string,
    allergies?: string[],
    majeur?: boolean,
    vegetarien?: boolean,
  ): Promise<Client> {
    const client = await this.findOne(id);
    if (nom !== undefined) client.nom = nom;
    if (allergies !== undefined) client.allergies = allergies;
    if (majeur !== undefined) client.majeur = majeur;
    if (vegetarien !== undefined) client.vegetarien = vegetarien;
    return this.clientRepository.save(client);
  }

  async remove(id: number): Promise<void> {
    const client = await this.findOne(id);
    await this.clientRepository.remove(client);
  }
}
