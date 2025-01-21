import { Injectable } from '@nestjs/common';
import { CreateAlarmCommand } from './commands/create-alarm.command';
import { CreateAlarmRepository } from './ports/create-alarm.repository';
// import { AlarmFactory } from '../domain/factories/alarm.factory';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetAlarmsQuery } from './queries/get-alarms.query';

@Injectable()
export class AlarmsService {
  constructor(
    // private readonly alarmRepository: CreateAlarmRepository,
    // private readonly alarmFactory: AlarmFactory,
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}
  create(createAlarmCommand: CreateAlarmCommand) {
    // const alarm = this.alarmFactory.create(
    //   createAlarmCommand.name,
    //   createAlarmCommand.severity,
    // );
    // return this.alarmRepository.save(alarm);
    return this.commandBus.execute(createAlarmCommand);
  }

  findAll() {
    // return this.alarmRepository.findAll();
    return this.queryBus.execute(new GetAlarmsQuery());
  }
}
