import { makePomodoro } from '@/tests/application/factories/pomodoro-factory';
import { PomodoroRepository } from '@/application/repositories/pomodoro-repository';
import { ChromeStoragePomodoroRepository } from '@/infra/database/chrome-storage/repositories/chrome-storage-pomodoro-repository';
import { ChromeStoragePomodoroMapper } from '@/infra/database/chrome-storage/mappers/chrome-storage-pomodoro-mapper';
const fakeStorage: any = {};
const chromeMock = {
  storage: {
    session: {
      get: vi.fn().mockImplementation((key) => fakeStorage),
      set: vi.fn().mockImplementation((input) => {
        console.log('input', input);
        Object.entries(input).map((value, key) => {
          fakeStorage[key] = value;
        });
      }),
    },
  },
};

vi.stubGlobal('chrome', chromeMock);
describe('ChromeStoragePomodoroRepository', () => {
  let sut: PomodoroRepository;
  const KEY = '@HelthDev:Pomodoro';

  beforeEach(() => {
    vitest.restoreAllMocks();
    sut = new ChromeStoragePomodoroRepository();
    vi.mocked(chrome.storage.session.get).mockImplementation(() => ({}));
  });
  describe('save', () => {
    it('should save a pomodoro', async () => {
      const pomodoro = makePomodoro();
      const value = ChromeStoragePomodoroMapper.toChromeStorage(pomodoro);

      await sut.save(pomodoro);
      expect(chrome.storage.session.set).toBeCalledTimes(1);
      expect(chrome.storage.session.set).toHaveBeenLastCalledWith({
        [KEY]: value,
      });
    });
  });
  describe('findOpenPomodoro', () => {
    it('should find a open pomodoro and return it', async () => {
      const pomodoro = makePomodoro();
      const value = ChromeStoragePomodoroMapper.toChromeStorage(pomodoro);
      vi.mocked(chrome.storage.session.get).mockImplementationOnce(() => ({
        [KEY]: value,
      }));

      const openPomodoro = await sut.findOpenPomodoro();
      expect(chrome.storage.session.get).toBeCalledTimes(1);
      expect(chrome.storage.session.get).toHaveBeenLastCalledWith(KEY);
      expect(openPomodoro).toEqual(pomodoro);
    });
    it('should return null when does not exist a open pomodoro', async () => {
      const openPomodoro = await sut.findOpenPomodoro();

      expect(openPomodoro).toBeNull();
    });
  });
});
