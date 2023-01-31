export const fakeStorage: any = {};
export const chromeStub = {
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
