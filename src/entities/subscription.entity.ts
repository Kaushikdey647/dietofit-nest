import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Subscription {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.id)
  user: User;

  @Column()
  planType: string;

  @Column()
  status: string;

  @Column({ type: 'date', nullable: true })
  trialEnd: string;

  @Column({ type: 'date', nullable: true })
  renewalDate: string;

  @CreateDateColumn()
  createdAt: Date;
}
