import { ChromeAlarmService } from '@/infra/gateways/chrome-alarm-service';

export const makeChromeAlarmService = () => {
  return new ChromeAlarmService();
};
