import {
  Notification,
  NotificationProps,
} from '@/application/entities/notification';

type Override = Partial<NotificationProps>;

export function makeNotification(override: Override = {}) {
  return new Notification({
    title: 'fake_title',
    description: 'fake_description',
    iconUrl: 'fake_icon_url',
    ...override,
  });
}
