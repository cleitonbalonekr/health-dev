const doc = {
  exists: () => true,
};
const firestore = () => {
  return {
    getFirestore: vitest.fn(),
    collection: vitest.fn(),
    doc: vitest.fn(),
    getDoc: vitest.fn().mockResolvedValue(doc),
    setDoc: vitest.fn(),
  };
};

export { firestore };
