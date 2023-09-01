import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  Document,
  HydratedDocument,
  Types,
  Schema as MongooseSchema,
} from 'mongoose';

export type ChallengesDocument = HydratedDocument<Challenges>;

@Schema({timestamps: true})
export class Challenges extends Document {
  @Prop({ required: true })
  title: string;
  @Prop({ required: true })
  content: string;
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  user: Types.ObjectId;
}

export const ChallengesSchema = SchemaFactory.createForClass(Challenges);
