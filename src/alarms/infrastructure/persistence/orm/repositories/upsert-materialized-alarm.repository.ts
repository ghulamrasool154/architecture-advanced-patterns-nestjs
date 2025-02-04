import { InjectModel } from '@nestjs/mongoose';
import { UpsertMaterializedAlarmRepository } from 'src/alarms/application/ports/upsert-materialized-alarm.repository';
import { MaterializedAlarmView } from '../schemas/marterialized-alarm-view.schema';
import { Model } from 'mongoose';
import { AlarmReadModel } from 'src/alarms/domain/read-models/alarm.read-model';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OrmUpsertMaterializedAlarmRepository
  implements UpsertMaterializedAlarmRepository
{
  constructor(
    @InjectModel(MaterializedAlarmView.name)
    private readonly alarmModel: Model<MaterializedAlarmView>,
  ) {}

  async upsert(
    alarm: Pick<AlarmReadModel, 'id'> & Partial<AlarmReadModel>,
  ): Promise<void> {
    await this.alarmModel.findOneAndUpdate(
      { id: alarm.id },
      { $set: alarm },
      { upsert: true },
    );
  }
}
