type Output = any;
type Input = {
  weight: number;
};

export type CalculeWaterQuantityDay = (input: Input) => Promise<Output>;

type Setup = () => CalculeWaterQuantityDay;

export const setupCalculeWaterQuantityDay: Setup =
  () =>
  async ({ weight }) => {
    const waterInMlPerLiter = 35;
    const waterNecessaryInMl = weight * waterInMlPerLiter;
    const waterNecessaryInLiters = (waterNecessaryInMl / 1000).toFixed(3);
    return waterNecessaryInLiters;
  };
