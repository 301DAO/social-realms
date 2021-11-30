export function base64Encode(str: any) {
  return Buffer.from(str, "utf-8").toString("base64");
};