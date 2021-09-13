const request = require("supertest");

const createApp = require("../app");

const app = createApp();

test("Return correct data to order request", async () => {
  const orderData = {
    language: "en",
    mimetype: "other",
    count: 1000,
  };
  await request(app)
    .post("/api")
    .send(orderData)
    .expect(200)
    .then((res) => {
      expect(typeof res.body.price === "number").toBeTruthy();
      expect(typeof res.body.time === "number").toBeTruthy();
      expect(typeof res.body.deadline === "number").toBeTruthy();
      expect(typeof res.body.deadline_date === "string").toBeTruthy();
    });
});

test("Order price with uk other text is 60 and time is 1", async () => {
  const orderData = {
    language: "uk",
    mimetype: "other",
    count: 656,
  };
  await request(app)
    .post("/api")
    .send(orderData)
    .then((res) => {
      expect(res.body.price === 60).toBeTruthy();
      expect(res.body.time === 1).toBeTruthy();
    });
});

test("Order price with uk docx text is 50 and time is 1", async () => {
  const orderData = {
    language: "uk",
    mimetype: "docx",
    count: 656,
  };
  await request(app)
    .post("/api")
    .send(orderData)
    .expect(200)
    .then((res) => {
      expect(res.body.price === 50).toBeTruthy();
      expect(res.body.time === 1).toBeTruthy();
    });
});

test("Order price with en docx text is 120 and time is 4", async () => {
  const orderData = {
    language: "en",
    mimetype: "docx",
    count: 1000,
  };
  await request(app)
    .post("/api")
    .send(orderData)
    .expect(200)
    .then((res) => {
      expect(res.body.price === 120).toBeTruthy();
      expect(res.body.time === 4).toBeTruthy();
    });
});