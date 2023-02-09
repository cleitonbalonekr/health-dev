import { Notification } from '@/application/entities/notification';

describe('Notification', () => {
  it('should create a new notification with correct values', () => {
    const notification = new Notification({
      title: 'fake_title',
      description: 'fake_description',
      iconUrl: 'fake_icon_url',
    });

    expect(notification).toBeInstanceOf(Notification);
    expect(notification).toMatchObject({
      title: 'fake_title',
      description: 'fake_description',
      iconUrl: 'fake_icon_url',
    });
  });
});
