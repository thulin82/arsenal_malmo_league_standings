import { describe, it, expect, beforeAll, afterAll } from "vitest";
import http from "http";
import { Server } from "http";
import app from "../src/server.js";

let server: Server;
let testPort: number;

beforeAll(async () => {
  server = http.createServer(app);
  return new Promise<void>((resolve) => {
    server.listen(0, () => {
      testPort = (server.address() as { port: number }).port;
      resolve();
    });
  });
});

afterAll(() => {
  return new Promise<void>((resolve) => {
    server.close(() => {
      resolve();
    });
  });
});

const baseUrl = (): string => `http://localhost:${testPort}`;

describe("Routes", () => {
  describe("GET /malmo", () => {
    it("should return json", async () => {
      const response = await fetch(`${baseUrl()}/malmo`);
      expect(response.status).toBe(200);
      expect(response.headers.get("content-type")).toContain("application/json");
    });
  });
  describe("GET /arsenal", () => {
    it("should return json", async () => {
      const response = await fetch(`${baseUrl()}/arsenal`);
      expect(response.status).toBe(200);
      expect(response.headers.get("content-type")).toContain("application/json");
    });
  });
  describe("GET /", () => {
    it("should return html", async () => {
      const response = await fetch(`${baseUrl()}/`);
      expect(response.status).toBe(200);
      expect(response.headers.get("content-type")).toContain("text/html");
    });
  });
});
