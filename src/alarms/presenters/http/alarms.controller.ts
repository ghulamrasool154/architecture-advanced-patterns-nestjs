import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateAlarmDto } from './dto/create-alarm.dto';
import { UpdateAlarmDto } from './dto/update-alarm.dto';
import { AlarmsService } from 'src/alarms/application/alarms.service';
import { CreateAlarmCommand } from 'src/alarms/application/commands/create-alarm.command';

@Controller('alarms')
export class AlarmsController {
  constructor(private readonly alarmsService: AlarmsService) {}

  @Post()
  create(@Body() createAlarmDto: CreateAlarmDto) {
    return this.alarmsService.create(
      new CreateAlarmCommand(
        createAlarmDto.name,
        createAlarmDto.severity,
        createAlarmDto.triggeredAt,
        createAlarmDto.items,
      ),
    );
  }

  @Get()
  findAll() {
    return this.alarmsService.findAll();
  }
}
