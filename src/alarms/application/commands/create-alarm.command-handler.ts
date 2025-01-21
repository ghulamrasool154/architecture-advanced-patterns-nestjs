import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { CreateAlarmCommand } from './create-alarm.command';
import { Logger } from '@nestjs/common';
import { CreateAlarmRepository } from '../ports/create-alarm.repository';
import { AlarmFactory } from 'src/alarms/domain/factories/alarm.factory';
import { AlarmCreatedEvent } from 'src/alarms/domain/events/alarm-created.events';

@CommandHandler(CreateAlarmCommand)
export class CreateAlarmCommandHandler
  implements ICommandHandler<CreateAlarmCommand>
{
  constructor(
    private readonly alarmRepository: CreateAlarmRepository,
    private readonly alarmFactory: AlarmFactory,
    private readonly eventBus: EventBus,
  ) {}
  private readonly logger = new Logger(CreateAlarmCommandHandler.name);
  async execute(command: CreateAlarmCommand) {
    this.logger.debug(
      `Processing "Create Alarm Command": ${JSON.stringify(command)}`,
    );

    const alarm = this.alarmFactory.create(
      command.name,
      command.severity,
      command.triggeredAt,
      command.items,
    );
    const newAlarm = await this.alarmRepository.save(alarm);
    this.eventBus.publish(new AlarmCreatedEvent(alarm));
    return newAlarm;
  }
}
