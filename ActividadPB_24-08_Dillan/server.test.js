import { test, describe, before, after } from "node:test";
import assert from "node:assert/strict";
import { server } from "./server.js";

describe("HTTP Server Tests", () => {
  let baseUrl;

  // Start server on a random free port for testing
  before((_, done) => {
    server.listen(0, () => {
      const port = server.address().port;
      baseUrl = `http://localhost:${port}`;
      done();
    });
  });

  // Close the server after running all tests
  after((_, done) => {
    server.close(done);
  });

  test("GET /salud should return 200 OK and valid status", async () => {
    const response = await fetch(`${baseUrl}/salud`);
    const data = await response.json();

    assert.equal(response.status, 200);
    assert.equal(data.status, "ok");
    assert.ok(data.timestamp);
  });

  test("GET /api/v1/info should return application metadata", async () => {
    const response = await fetch(`${baseUrl}/api/v1/info`);
    const data = await response.json();

    assert.equal(response.status, 200);
    assert.equal(data.name, "My First Backend API");
    assert.equal(data.version, "1.0.0");
  });

  test("GET /unknown-route should return 404 status code", async () => {
    const response = await fetch(`${baseUrl}/unknown-route`);
    const data = await response.json();

    assert.equal(response.status, 404);
    assert.equal(data.error, "Resource not found");
  });
});