import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { CommentDocument, Comments } from 'src/modal/CommentModal';
import { Model } from 'mongoose';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comments.name)
    private readonly commentsModel: Model<CommentDocument>,
  ) {}
  create(createCommentDto: CreateCommentDto): Promise<CommentDocument> {
    const post = new this.commentsModel({
      text: createCommentDto.text,
      challenge: createCommentDto.challenge[0],
      user: createCommentDto.user,
    });

    return post.save();
  }

  async findAll(query) {
    const comments = await this.commentsModel
      .find({ challenge: query?.challenge })
      .skip((query.page - 1) * 10)
      .populate('user')
      .populate('challenge');
    const data = {
      results: comments,
      total: comments.length,
      totalPages: Math.floor(comments.length / 10),
    };
    return data;
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
