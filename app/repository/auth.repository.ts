import { dbClient } from "../../internal/db/pg";
import { Auth, IAuthRepository } from "../interface/auth.interface";
import { User } from "../interface/user.interface";

export class AuthRepository implements IAuthRepository {
  async save(email: string, password: string): Promise<Auth> {
    try {
      const authData = (
        await dbClient.query<Auth>(
          `INSERT INTO auth (email, password) VALUES ('${email}', '${password}') RETURNING id, "createdAt", "updatedAt", "deletedAt", email, password`
        )
      ).rows[0];
      return authData;
    } catch (error: any) {
      throw new Error(error.message || "Error while saving auth");
    }
  }
  async findByEmailAndPass(email: string, password: string): Promise<User> {
    try {
      const auth = (
        await dbClient.query<User>(
          `SELECT auth.id AS "authId", "user".*
          FROM "auth"
          LEFT JOIN "user" ON "user"."authId" = auth.id
          WHERE auth.email='${email}' AND auth.password='${password}'
          `
        )
      ).rows[0];
      if (!auth) {
        throw new Error("Invalid credentials");
      }
      return auth;
    } catch (error: any) {
      console.log({ error });

      throw new Error(error.message + "Error while finding auth");
    }
  }
  async delete(id: string): Promise<void> {
    await dbClient.query(`DELETE FROM "auth" WHERE id='${id}'`);
  }
}
