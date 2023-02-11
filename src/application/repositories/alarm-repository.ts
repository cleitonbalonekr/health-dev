import { Alarm } from '@/application/entities/alarm';

export interface AlarmRepository {
  save(alarm: Alarm): Promise<void>;
}
