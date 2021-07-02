import app from "./app";
import request from "supertest";

const mockFailUrl = "https://google.com";
const mockImgUrl = "https://cdn.pixabay.com/photo/2021/05/23/21/57/mountains-6277391_1280.jpg";

describe('GET filteredimage/:inputUrl', () => {
  it("should be a valid route", async () => {
    const result = await request(app).get("/filteredimage");
    expect(result.status).toEqual(404);
  });
});