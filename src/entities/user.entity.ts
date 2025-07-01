import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  personalDataId: string; // 1:1 mapping to secure personal data

  @Column('float')
  height: number;

  @Column({ nullable: true })
  gender?: string;

  @Column({ nullable: true })
  dateOfBirth?: Date;
  // Add other constants as needed
}
