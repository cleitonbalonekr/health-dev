import { Notification } from '@/application/entities/notification';
import { makeNotification } from '../factories/notification-factory';

describe('Notification', () => {
  it('should create a new notification with correct values', () => {
    const notification = makeNotification();

    expect(notification).toBeInstanceOf(Notification);
    expect(notification).toMatchObject({
      title: 'fake_title',
      description: 'fake_description',
      iconUrl: 'fake_icon_url',
    });
  });
});
