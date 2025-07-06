import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Subscription {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @Column({
    type: 'enum',
    enum: ['free', 'basic', 'premium', 'enterprise'],
  })
  planType: string;

  @Column({
    type: 'enum',
    enum: ['active', 'inactive', 'cancelled', 'expired', 'trialing'],
    default: 'active',
  })
  status: string;

  @Column({ type: 'date', nullable: true })
  trialEnd: string;

  @Column({ type: 'date', nullable: true })
  renewalDate: string;

  @CreateDateColumn()
  createdAt: Date;
}
