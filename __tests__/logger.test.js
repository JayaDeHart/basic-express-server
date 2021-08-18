const logger = require("../src/middleware/logger.js");

describe("Logger Middleware:", () => {
  let consoleSpy;

  let req = {};
  let res = {};
  let next = jest.fn();

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, "log").mockImplementation();
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  it("should log method and path", () => {
    logger(req, res, next);
    expect(consoleSpy).toHaveBeenCalled();
  });
});
