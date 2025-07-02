import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
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
    if (!user) throw new NotFoundException('User not found');
    try {
      const checklist = this.checklistRepo.create({ ...check, user });
      return await this.checklistRepo.save(checklist);
    } catch (e) {
      throw new BadRequestException('Failed to create checklist');
    }
  }

  async findByUser(userId: number): Promise<Checklist[]> {
    try {
      return await this.checklistRepo.find({ where: { user: { id: userId } }, order: { date: 'DESC' } });
    } catch (e) {
      throw new BadRequestException('Failed to fetch checklists');
    }
  }

  async findOne(id: number): Promise<Checklist | null> {
    const check = await this.checklistRepo.findOne({ where: { id } });
    if (!check) throw new NotFoundException('Checklist not found');
    return check;
  }

  async remove(id: number): Promise<void> {
    const result = await this.checklistRepo.delete(id);
    if (!result.affected) throw new NotFoundException('Checklist not found');
  }
}
