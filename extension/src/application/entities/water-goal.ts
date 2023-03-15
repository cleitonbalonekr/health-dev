export class WaterGoal {
  private readonly waterGoal: number;

  constructor(waterGoal: number) {
    this.waterGoal = waterGoal;
  }

  get value(): number {
    return this.waterGoal;
  }
}
