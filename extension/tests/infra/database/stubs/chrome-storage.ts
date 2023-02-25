export const fakeStorage: any = {};
export const chromeStub = {
  storage: {
    session: {
      get: vi.fn().mockImplementation((key) => fakeStorage),
      set: vi.fn().mockImplementation((input) => {
        Object.entries(input).map((value, key) => {
          fakeStorage[key] = value;
        });
      }),
      remove: vi.fn().mockImplementation((key) => {
        delete fakeStorage[key];
      }),
    },
    local: {
      get: vi.fn().mockImplementation((key) => fakeStorage),
      set: vi.fn().mockImplementation((input) => {
        Object.entries(input).map((value, key) => {
          fakeStorage[key] = value;
        });
      }),
      remove: vi.fn().mockImplementation((key) => {
        delete fakeStorage[key];
      }),
    },
  },
};
