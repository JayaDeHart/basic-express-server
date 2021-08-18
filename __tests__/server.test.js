const { app } = require("../src/server");
const supertest = require("supertest");
const mockRequest = supertest(app);

describe("Express Server:", () => {
  it("should send a 404 error on a bad route request", () => {
    return mockRequest.get("/bad-route").then((results) => {
      expect(results.status).toEqual(404);
    });
  });

  it("should send a 404 error on a bad method", () => {
    return mockRequest.post("/person").then((results) => {
      expect(results.status).toEqual(404);
    });
  });

  it("should send a 200 code on a valid request", () => {
    return mockRequest.get("/person?name=jeff").then((results) => {
      expect(results.status).toEqual(200);
    });
  });

  it("should send a response object to a valid request", () => {
    return mockRequest.get("/person?name=jeff").then((results) => {
      expect(results.body).toHaveProperty("name");
    });
  });
});
