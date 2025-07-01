import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class MetricRecord {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number; // Foreign key, not a relation

  @Column('float')
  weight: number;

  @Column('float', { nullable: true })
  fatMass?: number;

  @Column('float', { nullable: true })
  lbm?: number;

  @Column('float', { nullable: true })
  smm?: number;

  @Column('float', { nullable: true })
  waterPercent?: number;

  @CreateDateColumn()
  timestamp: Date;
}
