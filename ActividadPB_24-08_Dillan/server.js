import { createServer } from "node:http";

export const PORT = Number(process.env.PORT ?? 3000);

/**
 * Helper function to send JSON responses consistently
 */
function sendJSON(response, statusCode, payload) {
  response.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8"
  });
  response.end(JSON.stringify(payload));
}

export const server = createServer((req, res) => {
  const { method, url } = req;

  // Health check endpoint
  if (method === "GET" && url === "/salud") {
    return sendJSON(res, 200, {
      status: "ok",
      timestamp: new Date().toISOString()
    });
  }

  // TDD / XP New Endpoint
  if (method === "GET" && url === "/api/v1/info") {
    return sendJSON(res, 200, {
      name: "My First Backend API",
      version: "1.0.0",
      author: "Student"
    });
  }

  // Default 404 response for unhandled routes
  return sendJSON(res, 404, {
    error: "Resource not found",
    message: `The route '${url}' does not exist on this server.`
  });
});

// Start server only when executed directly
const isMainModule = process.argv[1]?.endsWith("server.js");

if (isMainModule) {
  server.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
}