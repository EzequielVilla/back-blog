import { newDb } from "pg-mem";
import { AuthRepository } from "../../repository/auth.repository";
import { AuthService } from "../../service/auth.service";
import { dbClient } from "../../../internal/db/pg";
import { UserRepository } from "../../repository/user.repository";
import { UserService } from "../../service/user.service";

// Creo el backup antes de todo y recupero despues de cada ejecucion.
describe("Auth", () => {
  // beforeAll(() => {
  //   // dbClient.connect();
  // });
  // beforeEach(async () => {
  //   // db.reset();
  //   // await dbClient.connect();
  //   await dbClient.query("BEGIN");
  // });
  // // const db = newDb();
  // // const backup = db.backup();
  // afterEach(async () => {
  //   await dbClient.query("ROLLBACK");

  //   // backup.restore();
  // });

  afterAll(() => {
    // dbClient.query("ROLLBACK");

    dbClient.end();
  });

  it("signup should save user to the database", async () => {
    const userRepository = new UserRepository();
    const userService = new UserService(userRepository);
    const authRepository = new AuthRepository();
    const authService = new AuthService(authRepository, userService);

    try {
      await dbClient.query("BEGIN");

      const email = "test@example.com";
      const password = "password";
      const userName = "test";
      const auth = await authService.signUp(email, password, userName);

      await userService.delete(auth.user.id);
      await authService.delete(auth.id);

      expect(auth.email).toBe(email);
    } catch (error) {
      throw error;
    } finally {
      await dbClient.query("ROLLBACK");
    }
  });
  it("SignUp and login", async () => {
    const userRepository = new UserRepository();
    const userService = new UserService(userRepository);
    const authRepository = new AuthRepository();
    const authService = new AuthService(authRepository, userService);

    try {
      await dbClient.query("BEGIN");

      const email = "test@signAndLog.com";
      const password = "password";
      const userName = "test";

      const auth = await authService.signUp(email, password, userName);
      const token = await authService.login(email, password);
      const userByToken = await userService.getDataByToken(token);

      await userService.delete(auth.user.id);
      await authService.delete(auth.id);

      expect(userByToken.userName).toBe(userName);
    } catch (error) {
      throw error;
    } finally {
      await dbClient.query("ROLLBACK");
    }
  });
});
