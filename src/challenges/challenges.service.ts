import { Injectable, UseGuards } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Challenges, ChallengesDocument } from 'src/modal/ChallengesModal';
import * as path from 'path';
import * as fs from 'fs';
import { Model } from 'mongoose';
import { CreateChallengeDto } from './dto/create-challenge.dto';
import { UpdateChallengeDto } from './dto/update-challenge.dto';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class ChallengesService {
  constructor(
    @InjectModel(Challenges.name)
    private readonly ChallengesModel: Model<ChallengesDocument>,
  ) {}
  async create(
    createChallengeDto: CreateChallengeDto,
    // thumbnail: Express.Multer.File,
  ): Promise<ChallengesDocument> {
    // const thumbnailUrl = await this.uploadThumbnail(thumbnail);
    const post = new this.ChallengesModel({
      title: createChallengeDto.title,
      content: createChallengeDto.content,
      user: createChallengeDto.user,
    });

    return post.save();
  }
  // async uploadThumbnail(thumbnail: Express.Multer.File): Promise<string> {
  //   const uniqueFilename = Date.now() + '-' + Math.round(Math.random() * 1e9);
  //   const uploadPath = path.join('uploads', uniqueFilename);

  //   await fs.promises.writeFile(uploadPath, thumbnail.buffer);

  //   return uploadPath;
  // }

  @UseGuards(AuthGuard())
  async findAll({ query }) {
    const challenges = await this.ChallengesModel.find({ ...query }).populate('user');
    return challenges;
  }

  async findOne(id: string) {
    const challenges = (
      await this.ChallengesModel.findOne({ _id: id })
    ).populate('user');
    return challenges;
  }

  update(id: number, updateChallengeDto: UpdateChallengeDto) {
    return `This action updates a #${id} blog`;
  }

  remove(id: number) {
    return `This action removes a #${id} blog`;
  }
}
