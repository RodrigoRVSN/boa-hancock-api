import {
  CacheInterceptor,
  Controller,
  Get,
  NotFoundException,
  Param,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserService } from '../services/user.service';

@ApiBearerAuth()
@ApiTags('User')
@Controller('user')
@UseInterceptors(CacheInterceptor)
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  async getProfile(@Req() req) {
    const userFound = await this.userService.getUserById(req.user.id);

    return userFound;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getRandomUser(@Req() req) {
    const randomUser = await this.userService.getRandomUser(req.user.username);

    if (!randomUser) {
      throw new NotFoundException();
    }

    return randomUser;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async getUserById(@Param('id') id: string) {
    const userFound = await this.userService.getUserById(id);

    if (!userFound) {
      throw new NotFoundException();
    }

    return userFound;
  }
}
