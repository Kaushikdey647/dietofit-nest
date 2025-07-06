import { MongooseModuleOptions } from '@nestjs/mongoose';
import 'dotenv/config';

export const mongooseConfig = {
  uri: process.env.MONGO_URI ?? 'mongodb://localhost:27017/dietofit',
};
