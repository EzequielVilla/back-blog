import * as crypto from "crypto";

export function hashPassword(pass: string): string {
  return crypto.createHash("sha256").update(pass).digest("hex") as string;
}
