import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { User } from './user.entity';

@Entity('tb_motoristas')
export class Driver {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'usuario_id' })
  userId: number;

  @OneToOne(() => User, 'driverProfile')
  @JoinColumn({ name: 'usuario_id' })
  user: User;

  @Column({ length: 20 })
  cnh: string;

  @Column({ name: 'placa_veiculo', length: 10, nullable: true })
  placaVeiculo: string;

  @Column({ name: 'tipo_veiculo', length: 50, nullable: true })
  tipoVeiculo: string;

  @Column({ default: true })
  disponivel: boolean;

  // Relação lazy para evitar import circular com delivery.entity.ts
  @OneToMany('Delivery', 'driver')
  deliveries: unknown[];
}
