import { expect } from "chai";
import chai from "chai";
import chaiHttp from "chai-http";
// import request from "supertest";
import { app } from "../../../index"; // Supongo que tienes una clase que inicia tu aplicación Express

chai.use(chaiHttp);
describe("AuthController E2E Tests", () => {
  it("should create a new user", (done) => {
    chai
      .request(app)
      .post("/api/v1/auth/signUp")
      .send({
        email: "test@example.com",
        password: "password",
        userName: "testuser",
      })
      .end(
        (
          err: any,
          res: { status: any; body: { success: any; message: any } }
        ) => {
          expect(res.status).to.equal(201);
          expect(res.body.success).to.be.true;
          expect(res.body.message).to.equal("User created successfully");
          done();
        }
      );
  });
  it("Should throw error creating user twice", (done) => {
    chai
      .request(app)
      .post("/api/v1/auth/signUp")
      .send({
        email: "test@example.com",
        password: "password",
        userName: "testuser",
      })
      .end(() => {
        chai
          .request(app)
          .post("/api/v1/auth/signup")
          .send({
            email: "test@example.com",
            password: "password",
            userName: "testuser",
          })
          .end(
            (
              err: any,
              res: { status: any; body: { success: any; message: any } }
            ) => {
              expect(res.status).to.equal(400);
              expect(res.body.success).to.be.false;
              expect(res.body.message).to.equal("Error during sign up");
              done();
            }
          );
      });
  });
  it("Login successful", (done) => {
    chai
      .request(app)
      .post("/api/v1/auth/signUp")
      .send({
        email: "test@example.com",
        password: "password",
        userName: "testuser",
      })
      .end(
        (
          err: any,
          res: { status: any; body: { success: any; message: any } }
        ) => {
          expect(res.status).to.equal(201);
          expect(res.body.success).to.be.true;
          expect(res.body.message).to.equal("User created successfully");
          chai
            .request(app)
            .post("/api/v1/auth/login")
            .send({
              email: "test@example.com",
              password: "password",
            })
            .end(
              (
                err: any,
                res: { status: any; body: { success: any; message: any } }
              ) => {
                expect(res.status).to.equal(200);
                expect(res.body.success).to.be.true;
                expect(res.body.message).to.equal("Login successfully");
                done();
              }
            );
        }
      );
  });
  it("Login throw error for wrong email or password", (done) => {
    chai
      .request(app)
      .post("/api/v1/auth/signUp")
      .send({
        email: "test34@example.com",
        password: "password34",
        userName: "testuser34",
      })
      .end(
        (
          err: any,
          res: { status: any; body: { success: any; message: any } }
        ) => {
          expect(res.status).to.equal(201);
          expect(res.body.success).to.be.true;
          expect(res.body.message).to.equal("User created successfully");
          chai
            .request(app)
            .post("/api/v1/auth/login")
            .send({
              email: "test@example.com",
              password: "wrongpassword",
            })
            .end(
              (
                err: any,
                res: { status: any; body: { success: any; message: any } }
              ) => {
                expect(res.status).to.equal(400);
                expect(res.body.success).to.be.false;
                expect(res.body.message).to.equal("Error during login");
                done();
              }
            );
        }
      );
  });
});
