import { v4, v7 } from "uuid";

export class RandomUtils {
  public generateUUID(): string {
    return v4();
  }
  public generateTimeBasedUUID(): string {
    return v7();
  }
}

export const randomUtils = new RandomUtils();
