import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SuccessStorySchema } from './schemas/success-story.schema';
import { SuccessStoryService } from './success-story.service';
import { SuccessStoryController } from './success-story.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'SuccessStory', schema: SuccessStorySchema }])],
  providers: [SuccessStoryService],
  controllers: [SuccessStoryController],
  exports: [SuccessStoryService],
})
export class SuccessStoryModule {}
