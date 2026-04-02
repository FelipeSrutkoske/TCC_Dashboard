import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Delivery, StatusEntrega } from './entities/delivery.entity';

@Injectable()
export class DeliveriesService {
  constructor(
    @InjectRepository(Delivery)
    private readonly deliveriesRepository: Repository<Delivery>,
  ) {}

  create(createDeliveryDto: any): Promise<Delivery> {
    const delivery = this.deliveriesRepository.create(createDeliveryDto as Delivery);
    return this.deliveriesRepository.save(delivery) as Promise<Delivery>;
  }

  findAll(): Promise<Delivery[]> {
    return this.deliveriesRepository.find({
      relations: ['driver', 'driver.user', 'occurrences'],
      order: { id: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Delivery> {
    const delivery = await this.deliveriesRepository.findOne({
      where: { id },
      relations: ['driver', 'driver.user', 'occurrences', 'finalization'],
    });
    if (!delivery) throw new NotFoundException(`Entrega #${id} não encontrada`);
    return delivery;
  }

  async update(id: number, data: Record<string, unknown>): Promise<Delivery> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await this.deliveriesRepository.update(id, data as any);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const delivery = await this.findOne(id);
    await this.deliveriesRepository.remove(delivery);
  }

  async getStats() {
    const total = await this.deliveriesRepository.count();
    const entregues = await this.deliveriesRepository.count({ where: { status: StatusEntrega.ENTREGUE } });
    const pendentes = await this.deliveriesRepository.count({ where: { status: StatusEntrega.AGUARDANDO_MOTORISTA } });
    const emRota = await this.deliveriesRepository.count({ where: { status: StatusEntrega.EM_ROTA } });
    const cancelados = await this.deliveriesRepository.count({ where: { status: StatusEntrega.CANCELADO } });
    return { total, entregues, pendentes, emRota, cancelados };
  }
}
