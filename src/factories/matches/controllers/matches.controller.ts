import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { MatchesService } from '../services/matches.service';
import { IGetAllMatches } from './matches.controller.types';

@ApiBearerAuth()
@ApiTags('Matches')
@Controller('matches')
export class MatchesController {
  constructor(private matchesService: MatchesService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  getAllMatchs(@Req() req: IGetAllMatches) {
    return this.matchesService.getAllMatchs(req.user.id);
  }
}
