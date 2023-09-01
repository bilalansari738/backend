import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  Query,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';
import { ChallengesService } from './challenges.service';
import { CreateChallengeDto } from './dto/create-challenge.dto';
import { UpdateChallengeDto } from './dto/update-challenge.dto';

@Controller('challenges')
export class ChallengesController {
  constructor(private readonly challengesService: ChallengesService) {}

  @UseGuards(AuthGuard())
  @Post()
  // @UseInterceptors(FileInterceptor('thumbnail'))
  async create(
    // @UploadedFile() thumbnail: Express.Multer.File,
    @Body() createChallengeDto: CreateChallengeDto,
  ) {
    return this.challengesService.create(createChallengeDto);
  }

  @Get()
  findAll(@Query() query) {
    return this.challengesService.findAll({query});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.challengesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChallengeDto: UpdateChallengeDto) {
    return this.challengesService.update(+id, updateChallengeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.challengesService.remove(+id);
  }
}
