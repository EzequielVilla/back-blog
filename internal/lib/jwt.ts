import jwt from "jsonwebtoken";
import { User, UserKeys } from "../../app/interface/user.interface";

export class JWT {
  static createToken(user: User): string {
    const token = jwt.sign(
      {
        id: user.id,
        userName: user.userName,
        authId: user.authId,
      },
      process.env.JWT_SECRET! || "Test"
    );
    return token;
  }
  static decodeToken(token: string): User {
    const decoded = jwt.verify(token, process.env.JWT_SECRET! || "Test");
    return decoded as User;
  }
  static getSpecificValue(token: string, key: UserKeys): string | Date {
    const decoded = this.decodeToken(token);
    return decoded[key];
  }
}
