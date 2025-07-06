import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SuccessStoryDocument } from './schemas/success-story.schema';


@Injectable()
export class SuccessStoryService {
  constructor(
    @InjectModel('SuccessStory') private storyModel: Model<SuccessStoryDocument>,
  ) {}

  async findAll() {
    return this.storyModel.find();
  }

  async create(story: Partial<SuccessStoryDocument>) {
    return this.storyModel.create(story);
  }
}
