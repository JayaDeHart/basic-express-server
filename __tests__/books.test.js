require("dotenv").config();
const { app } = require("../src/server");
const supertest = require("supertest");
const mockRequest = supertest(app);
const { db } = require("../src/models/index.js");

describe("books Routes:", () => {
  beforeEach(async () => {
    await db.sync();
  });

  afterEach(async () => {
    await db.drop();
  });

  //GET all
  it("should respond with a status code of 200 and a list of books to a request for all books", () => {
    return mockRequest
      .post("/books")
      .send({ title: "test", releaseYear: 1969 })
      .then((data) => {
        mockRequest.get("/books").then((results) => {
          expect(results.status).toBe(200);
          expect(typeof results.body).toBe("object");
        });
      });
  });

  //GET one
  it("should respond with a status code of 200 and the queried book to a request for one book", () => {
    return mockRequest
      .post("/books")
      .send({ title: "test", releaseYear: 1969 })
      .then((data) => {
        mockRequest.get(`/books/${data.id}`).then((results) => {
          expect(results.status).toBe(200);
          expect(typeof results.body).toBe("object");
        });
      });
  });

  //POST
  it("should respond with a status code of 201 and the created book upon creation", () => {
    return mockRequest
      .post("/books")
      .send({ title: "Team Fortress 2", releaseYear: 2007 })
      .then((results) => {
        expect(results.status).toBe(201);
        expect(typeof results.body).toBe("object");
      });
  });

  // PUT;
  it("should respond with a status code of 202 and the updated book after successfully updating", () => {
    return mockRequest
      .post("/books")
      .send({ title: "Team Fortress 2", releaseYear: 2007 })
      .then((data) => {
        mockRequest.put(`/books/${data.id}`).then((results) => {
          expect(results.status).toBe(202);
          expect(typeof results.body).toBe("object");
        });
      });
  });

  //DELETE
  it("should respond with a status code of 202 after successfully deleting", () => {
    mockRequest
      .post("/books")
      .send({ title: "Team Fortress 2", releaseYear: 2007 })
      .then((data) => {
        mockRequest.delete(`/books/${data.id}`).then((results) => {
          expect(results.status).toBe(202);
          expect(typeof results.body).toBe(null);
        });
      });
  });

  //Errors
  // it("should respond with a 404 error when trying to access a book that does not exist", () => {
  //   mockRequest.get("/books/abcd").then((results) => {
  //     expect(results.status).toBe(404);
  //   });
  // });

  // it("should respond with a 400 error when recieving incorrect data for creating or updating", () => {
  //   mockRequest
  //     .post("/books")
  //     .send({ title: 200, releaseYear: "2001" })
  //     .then((results) => {
  //       expect(results.status).toBe(400);
  //     });
  // });
});
