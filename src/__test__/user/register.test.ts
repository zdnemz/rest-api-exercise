import supertest from "supertest";
import { createUser, deleteUser } from "../utils/users";
import { web } from "../../utils/web";

const request = supertest(web);

describe("POST /api/user/register", () => {
  afterEach(async () => {
    await deleteUser({ email: "test@example.com" });
  });

  it("success register", async () => {
    const userData = {
      username: "test",
      email: "test@example.com",
      password: "Test123.com",
    };

    const response = await request.post("/api/user/register").send(userData);

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.status).toBe(201);
    expect(response.body.data.token).toBeDefined();

  });

  it("User already exists", async () => {
    await createUser({
      username: "test",
      email: "test@example.com",
      password: "Test123.com",
    });

    const userData = {
      username: "test",
      email: "test@example.com",
      password: "Test123.com",
    };

    const response = await request.post("/api/user/register").send(userData);

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.status).toBe(400);
    expect(response.body.error.message).toBe("User already exists");
    expect(response.body.error.details).toBeDefined();

  });

  it("Email invalid", async () => {
    const userData = {
      username: "test",
      email: "test",
      password: "Test123.com",
    };

    const response = await request.post("/api/user/register").send(userData);

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.status).toBe(400);
    expect(response.body.error.message).toBe("Validation error");
    expect(response.body.error.details).toBeDefined();

  })
});
