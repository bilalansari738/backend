import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  Document,
  HydratedDocument,
  Types,
  Schema as MongooseSchema,
} from 'mongoose';

export type CommentDocument = HydratedDocument<Comments>;

@Schema({timestamps: true})
export class Comments extends Document {
  @Prop({ required: true })
  text: string;
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  user: Types.ObjectId;
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Challenges' })
  challenge: Types.ObjectId;
}

export const CommentsSchema = SchemaFactory.createForClass(Comments);
