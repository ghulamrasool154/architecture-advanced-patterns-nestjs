import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AlarmCreatedEvent } from 'src/alarms/domain/events/alarm-created.events';
import { UpsertMaterializedAlarmRepository } from '../ports/upsert-materialized-alarm.repository';

@EventsHandler(AlarmCreatedEvent)
export class AlarmCreatedEventHandler
  implements IEventHandler<AlarmCreatedEvent>
{
  constructor(
    private readonly upsertMaterializedAlarmRepository: UpsertMaterializedAlarmRepository,
  ) {}
  private readonly logger = new Logger(AlarmCreatedEventHandler.name);

  async handle(event: AlarmCreatedEvent) {
    this.logger.log(`Alarm created event: ${JSON.stringify(event)} `);
    await this.upsertMaterializedAlarmRepository.upsert({
      id: event.alarm.id,
      name: event.alarm.name,
      severity: event.alarm.severity.value,
      triggeredAt: event.alarm.triggeredAt,
      items: event.alarm.items,
    });
  }
}
