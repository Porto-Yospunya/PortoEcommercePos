import { uuidv7 } from "uuidv7";
import { parse as uuidParse, stringify as uuidStringfy } from "uuid";

export const generate = () => {
  const uuid = uuidv7();
  return Buffer.from(uuid.replace(/-/g, ""), "hex");
}

export const parse = (uuid: string) => {
  return Buffer.from(uuidParse(uuid));
}

export const stringify = (uuid: Uint8Array<ArrayBufferLike>) => {
  return uuidStringfy(uuid);
}