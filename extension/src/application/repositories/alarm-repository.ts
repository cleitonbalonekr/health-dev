import { Alarm, AlarmType } from '@/application/entities/alarm';

export interface AlarmRepository {
  save(alarm: Alarm): Promise<void>;
  getByType(type: AlarmType): Promise<Alarm | null>;
  remove(type: AlarmType): Promise<void>;
}
