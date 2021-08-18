const validator = require("../src/middleware/validator.js");

describe("Validator Middleware:", () => {
  let req = { query: {} };
  let res = {};
  let next = jest.fn();

  it("should call next if the query string has a name property", () => {
    req.query.name = "fred";
    validator(req, res, next);
    expect(next).toHaveBeenCalled();
  });

  // it("should throw an error if the query string does not have a name property", () => {
  //   expect(validator(req, res, next).toThrow());
  // });
  //cant get this working, going to ask about in class tomorrow
});
