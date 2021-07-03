import app from "./app";
import request from "supertest";
import rimraf from "rimraf";
import { readdir } from "fs";

const route = "/filteredimage";
const mockFailUrl = "https://google.com";
const mockImgUrl = "https://cdn.pixabay.com/photo/2021/05/23/21/57/mountains-6277391_1280.jpg";
const getEndpoint = (mockUrl: string) => `${route}?image_url=${mockUrl}`;

describe('GET filteredimage/:inputUrl', () => {
  it("should be a valid route", async () => {
    const res = await request(app).get("/filteredimage");
    expect(res.status).not.toEqual(404);
  });

  it("should return HTTP 400 if image_url query parameter is not defined", async () => {
    const res = await request(app).get(route);
    expect(res.status).toEqual(400);
    expect(res.text).toBeDefined();
  });

  it("should return HTTP 422 if image url is an unprocessible entity", async () => {
    const res = await request(app).get(getEndpoint(mockFailUrl));
    expect(res.status).toEqual(422);
    expect(res.text).toBeDefined();
  });

  it("should return HTTP 200 with filtered image", async () => {
    const res = await request(app).get(getEndpoint(mockImgUrl));
    expect(res.status).toEqual(200);
    expect(res.type).toEqual('image/jpeg');
    readdir(__dirname + "/util/tmp/", (err, files) => {
      expect(files.length).toBe(0);
    });
  });

  afterAll(() => {
    rimraf(__dirname + "/util/tmp/", (error) => {});
  });
});