import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Finalization } from './entities/finalization.entity';

@Injectable()
export class FinalizationsService {
  constructor(
    @InjectRepository(Finalization)
    private readonly finalizationsRepository: Repository<Finalization>,
  ) {}

  create(data: Partial<Finalization>): Promise<Finalization> {
    const finalization = this.finalizationsRepository.create(data);
    return this.finalizationsRepository.save(finalization);
  }

  findAll(): Promise<Finalization[]> {
    return this.finalizationsRepository.find({
      relations: ['delivery'],
      order: { finalizedAt: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Finalization> {
    const finalization = await this.finalizationsRepository.findOne({
      where: { id },
      relations: ['delivery'],
    });
    if (!finalization)
      throw new NotFoundException(`Finalização #${id} não encontrada`);
    return finalization;
  }

  async update(id: number, data: Partial<Finalization>): Promise<Finalization> {
    const finalization = await this.findOne(id);
    Object.assign(finalization, data);
    return this.finalizationsRepository.save(finalization);
  }

  async remove(id: number): Promise<void> {
    const finalization = await this.findOne(id);
    await this.finalizationsRepository.remove(finalization);
  }
}
