import supertest from "supertest";
import { createUser, deleteUser } from "../utils/users";
import { web } from "../../utils/web";

const request = supertest(web);

describe("POST /api/user/login", () => {
  beforeAll(async () => {
    await createUser({
      username: "test",
      email: "test@example.com",
      password: "Test123.com",
    });
  });

  afterAll(async () => {
    await deleteUser({ email: "test@example.com" });
  });

  it("should to success login", async () => {
    const userData = {
      email: "test@example.com",
      password: "Test123.com",
    };

    const response = await request.post("/api/user/login").send(userData);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.status).toBe(200);
    expect(response.body.data.token).toBeDefined();
  });

  it("should return 401 (invalid password)", async () => {
    const userData = {
      email: "test@example.com",
      password: "wrongpassword",
    };

    const response = await request.post("/api/user/login").send(userData);

    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
    expect(response.body.status).toBe(401);
    expect(response.body.error.message).toBe("Email or password wrong");
  });

  it("should return 401 (invalid email)", async () => {
    const userData = {
      email: "wrong@example.com",
      password: "Test123.com",
    };

    const response = await request.post("/api/user/login").send(userData);

    console.log(response.body);
    

    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
    expect(response.body.status).toBe(401);
    expect(response.body.error.message).toBe("Email or password wrong");
  });
});
