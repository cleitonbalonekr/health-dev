chrome.alarms.onAlarm.addListener(() => {
  chrome.notifications.create(
    {
      type: 'basic',
      iconUrl: 'alarm.jpg',
      title: 'Stay Hydrated',
      message: 'Have a sip of water human!',
      silent: false,
    },
    () => {}
  );
});
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log(request);
  if (request.delayInMinutes) createAlarm(request);

  // sendResponse(() => {
  //   return false;
  // });
});

function createAlarm({ delayInMinutes }: { delayInMinutes: number }) {
  console.log('delayInMinutes', delayInMinutes);
  chrome.alarms.create('drink_water', {
    delayInMinutes,
    // periodInMinutes: 1,
  });
}
