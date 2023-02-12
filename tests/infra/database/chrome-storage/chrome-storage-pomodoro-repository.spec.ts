import { makePomodoro } from '@/tests/application/factories/pomodoro-factory';
import { PomodoroRepository } from '@/application/repositories/pomodoro-repository';
import { ChromeStoragePomodoroRepository } from '@/infra/database/chrome-storage/repositories/chrome-storage-pomodoro-repository';
import { ChromeStoragePomodoroMapper } from '@/infra/database/chrome-storage/mappers/chrome-storage-pomodoro-mapper';
import { chromeStub, fakeStorage } from '../stubs/chrome-storage';

vi.stubGlobal('chrome', chromeStub);

const makePomodoroToChromeStorage = () => {
  const pomodoro = makePomodoro();
  const value = ChromeStoragePomodoroMapper.toChromeStorage(pomodoro);
  return { pomodoro, value };
};

describe('ChromeStoragePomodoroRepository', () => {
  let sut: PomodoroRepository;
  const KEY = '@HelthDev:Pomodoro';

  beforeEach(() => {
    sut = new ChromeStoragePomodoroRepository();
    vi.mocked(chrome.storage.session.get).mockImplementation(() => ({}));
  });
  describe('save', () => {
    it('should save a pomodoro', async () => {
      const { pomodoro, value } = makePomodoroToChromeStorage();

      await sut.save(pomodoro);

      expect(chrome.storage.session.set).toBeCalledTimes(1);
      expect(chrome.storage.session.set).toHaveBeenLastCalledWith({
        [KEY]: value,
      });
    });
  });
  describe('findOpenPomodoro', () => {
    it('should find a open pomodoro and return it', async () => {
      const { pomodoro, value } = makePomodoroToChromeStorage();
      vi.mocked(chrome.storage.session.get).mockImplementationOnce(() => ({
        [KEY]: value,
      }));

      const openPomodoro = await sut.findPomodoro();

      expect(chrome.storage.session.get).toBeCalledTimes(1);
      expect(chrome.storage.session.get).toHaveBeenLastCalledWith(KEY);
      expect(openPomodoro).toEqual(pomodoro);
    });
    it('should return null when does not exist a open pomodoro', async () => {
      const openPomodoro = await sut.findPomodoro();

      expect(openPomodoro).toBeNull();
    });
  });
  describe('removePomodoro', () => {
    it('should remove a pomodoro', async () => {
      await sut.removePomodoro();

      expect(chrome.storage.session.remove).toBeCalledTimes(1);
      expect(chrome.storage.session.remove).toBeCalledWith(KEY);
    });
  });
});
