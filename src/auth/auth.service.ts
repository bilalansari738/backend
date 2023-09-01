import { Model } from 'mongoose';
import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/modal/UserModal';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/user/dto/Userdto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly UserModel: Model<UserDocument>,
    private jwtService: JwtService
  ) {}

  async create(CreateUserDto: CreateUserDto): Promise<UserDocument> {
    let userFound = await this.UserModel.findOne({
      email: CreateUserDto.email,
    });
    if (userFound) {
      throw new ConflictException('Email address already in use');
    }
    const { password, ...userData } = CreateUserDto;
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const createdUser = new this.UserModel({
      ...userData,
      password: hashedPassword,
    });
    return createdUser.save();
  }

  async signIn(CreateUserDto: CreateUserDto): Promise<any> {
    let userFound = await this.UserModel.findOne({
      email: CreateUserDto.email,
    });
    if (!userFound) {
      throw new ConflictException('User not found!');
    }
    let passwordMatched = await bcrypt.compare(
      CreateUserDto.password,
      userFound.password,
    );
    if (!passwordMatched) throw new ConflictException('Invalid login details!');
    const payload = {
        email: userFound.email,
        username: userFound.username,
    }
    const {password, ...user} = userFound.toObject()
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }
  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.UserModel.findOne({email});
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async findAll(): Promise<UserDocument[]> {
    return this.UserModel.find().exec();
  }
}
