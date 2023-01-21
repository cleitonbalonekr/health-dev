import { makePomodoro } from '@/tests/application/factories/pomodoro-factory';
import { PomodoroRepository } from '@/application/repositories/pomodoro-repository';
import { LocalStoragePomodoroRepository } from '@/infra/database/local-storage/repositories/local-storage-pomodoro-repository';
import { LocalStoragePomodoroMapper } from '@/infra/database/local-storage/mappers/local-storage-pomodoro-mapper';

describe('LocalStoragePomodoroRepository', () => {
  let sut: PomodoroRepository;
  const KEY = '@HelthDev:Pomodoro';

  beforeEach(() => {
    vitest.restoreAllMocks();
    sut = new LocalStoragePomodoroRepository();
    localStorage.clear();
  });
  describe('save', () => {
    it('should save a pomodoro', async () => {
      const pomodoro = makePomodoro();
      const value = LocalStoragePomodoroMapper.toLocalStorage(pomodoro);

      await sut.save(pomodoro);

      expect(localStorage.setItem).toBeCalledTimes(1);
      expect(localStorage.setItem).toHaveBeenLastCalledWith(KEY, value);
      expect(Object.keys(localStorage.__STORE__).length).toBe(1);
      expect(localStorage.__STORE__[KEY]).toBe(value);
    });
  });
  describe('findOpenPomodoro', () => {
    it('should find a open pomodoro and return it', async () => {
      const pomodoro = makePomodoro();
      const value = LocalStoragePomodoroMapper.toLocalStorage(pomodoro);
      localStorage.setItem(KEY, value);
      console.log(localStorage.__STORE__[KEY]);
      const openPomodoro = await sut.findOpenPomodoro();

      expect(localStorage.getItem).toBeCalledTimes(1);
      expect(localStorage.getItem).toHaveBeenLastCalledWith(KEY);
      expect(openPomodoro).toEqual(pomodoro);
    });
    it('should return null when does not exist a open pomodoro', async () => {
      const openPomodoro = await sut.findOpenPomodoro();

      expect(openPomodoro).toBeNull();
    });
  });
});
