import { InjectRepository } from '@nestjs/typeorm';
import { Alarm } from 'src/alarms/domain/alarm';
import { AlarmEntity } from '../entities/alarm.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { AlarmMapper } from '../mappers/alarm.mapper';
import { CreateAlarmRepository } from 'src/alarms/application/ports/create-alarm.repository';
import { FindAlarmRepository } from 'src/alarms/application/ports/find-alarm.repository';
import { UpsertMaterializedAlarmRepository } from 'src/alarms/application/ports/upsert-materialized-alarm.repository';
import { AlarmReadModel } from 'src/alarms/domain/read-models/alarm.read-model';

@Injectable()
export class InMemoryAlarmRepository
  implements
    CreateAlarmRepository,
    FindAlarmRepository,
    UpsertMaterializedAlarmRepository
{
  private readonly alarms = new Map<string, AlarmEntity>();
  private readonly materializedAlarmViews = new Map<string, AlarmReadModel>();

  async findAll(): Promise<AlarmReadModel[]> {
    return Array.from(this.materializedAlarmViews.values());
  }
  async save(alarm: Alarm): Promise<Alarm> {
    const persistenceModel = AlarmMapper.toPersistence(alarm);

    this.alarms.set(persistenceModel.id, persistenceModel);
    const newEntity = this.alarms.get(persistenceModel.id);
    return AlarmMapper.toDomain(newEntity);
  }
  upsert(
    alarm: Pick<AlarmReadModel, 'id'> & Partial<AlarmReadModel>,
  ): Promise<void> {
    if (this.materializedAlarmViews.has(alarm.id)) {
      this.materializedAlarmViews.set(alarm.id, {
        ...this.materializedAlarmViews.get(alarm.id),
        ...alarm,
      });
      return;
    }
    this.materializedAlarmViews.set(alarm.id, alarm as AlarmReadModel);
  }
}
