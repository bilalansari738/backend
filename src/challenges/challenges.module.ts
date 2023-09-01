import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Challenges, ChallengesSchema } from 'src/modal/ChallengesModal';
import { AuthModule } from 'src/auth/auth.module';
import { ChallengesController } from './challenges.controller';
import { ChallengesService } from './challenges.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Challenges.name, schema: ChallengesSchema }]),
    AuthModule,
  ],
  controllers: [ChallengesController],
  providers: [ChallengesService],
})
export class ChallengesModule {}
