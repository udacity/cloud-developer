import app from "./app";
import request from "supertest";
import rimraf from "rimraf";
import { existsSync } from "fs";

const route = "/filteredimage";
const mockFailUrl = "https://google.com";
const mockImgUrl = "https://cdn.pixabay.com/photo/2021/05/23/21/57/mountains-6277391_1280.jpg";
const getEndpoint = (mockUrl: string) => `${route}?image_url=${mockUrl}`;

describe('GET filteredimage/:inputUrl', () => {
  it("should be a valid route", async () => {
    const result = await request(app).get("/filteredimage");
    expect(result.status).not.toEqual(404);
  });

  it("should return HTTP 400 if image_url query parameter is not defined", async () => {
    const result = await request(app).get(route);
    expect(result.status).toEqual(400);
    expect(result.body.error).toBeDefined();
  });

  it("should return HTTP 422 if image url is an unprocessible entity", async () => {
    const result = await request(app).get(getEndpoint(mockFailUrl));
    expect(result.status).toEqual(422);
    expect(result.body.error).toBeDefined();
  });

  it("should return HTTP 200 with path to image in temporary directory", async () => {
    const result = await request(app).get(getEndpoint(mockImgUrl));
    expect(result.status).toEqual(200);
    expect(existsSync(result.body.url)).toBe(true);
    expect(result.body.url).toBeDefined();
  });

  afterAll(() => {
    rimraf(__dirname + "/util/tmp/", (error) => {
      const msg = error;
    });
  });
});