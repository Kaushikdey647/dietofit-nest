import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Checklist } from '../entities/checklist.entity';
import { IChecklist } from '../interfaces/checklist.interface';
import { User } from '../entities/user.entity';

@Injectable()
export class ChecklistService {
  constructor(
    @InjectRepository(Checklist)
    private readonly checklistRepo: Repository<Checklist>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async create(check: IChecklist): Promise<Checklist> {
    const user = await this.userRepo.findOne({ where: { id: check.user } });
    if (!user) throw new Error('User not found');
    const checklist = this.checklistRepo.create({ ...check, user });
    return this.checklistRepo.save(checklist);
  }

  async findByUser(userId: number): Promise<Checklist[]> {
    return this.checklistRepo.find({ where: { user: { id: userId } }, order: { date: 'DESC' } });
  }

  async findOne(id: number): Promise<Checklist | null> {
    return this.checklistRepo.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.checklistRepo.delete(id);
  }
}
