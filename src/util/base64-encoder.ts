export function base64Encode(str: string) {
  return Buffer.from(str, "utf-8").toString("base64");
};