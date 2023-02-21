import axios from 'axios';

async function testEmulatorRequest() {
  const headers = {
    Authorization: 'Bearer owner',
  };
  const url = 'http://127.0.0.1:9099';
  const response = await axios.get(url, {
    headers,
  });
  return response;
}
let count = 0;
async function testEmulatorIsRunning() {
  count += 1;
  try {
    if (count > 6) {
      return 'emulator is not running';
    }
    const response = await testEmulatorRequest();
    if (response.status === 200) {
      console.log('Emulator is  running');
      return 'emulator is  running';
    }
  } catch (error) {
    console.log('error: ', 'Emulator is not running');
    setTimeout(() => {
      testEmulatorIsRunning();
    }, 6000);
  }
}
testEmulatorIsRunning();
