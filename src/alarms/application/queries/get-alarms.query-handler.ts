import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAlarmsQuery } from './get-alarms.query';
import { FindAlarmRepository } from '../ports/find-alarm.repository';
import { AlarmReadModel } from 'src/alarms/domain/read-models/alarm.read-model';

@QueryHandler(GetAlarmsQuery)
export class GetAlarmsQueryHandler
  implements IQueryHandler<GetAlarmsQuery, AlarmReadModel[]>
{
  constructor(private readonly findAlarmRepository: FindAlarmRepository) {}
  async execute(query: GetAlarmsQuery): Promise<AlarmReadModel[]> {
    return await this.findAlarmRepository.findAll();
  }
}
