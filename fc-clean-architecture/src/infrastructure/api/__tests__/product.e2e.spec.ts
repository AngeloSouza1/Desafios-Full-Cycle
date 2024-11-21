import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for product", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    const response = await request(app)
      .post("/product")
      .send({
        id: "1",
        name: "Product A",
        price: 100,
      });

    expect(response.status).toBe(200);
    expect(response.body.id).toBe("1");
    expect(response.body.name).toBe("Product A");
    expect(response.body.price).toBe(100);
  });

  it("should list all products", async () => {
    const response1 = await request(app).post("/product").send({
      id: "1",
      name: "Product A",
      price: 100,
    });
    expect(response1.status).toBe(200);
  
    const response2 = await request(app).post("/product").send({
      id: "2",
      name: "Product B",
      price: 200,
    });
    expect(response2.status).toBe(200);
  
    const listResponse = await request(app).get("/product").send();
  
    expect(listResponse.status).toBe(200);
    expect(listResponse.body.products).toBeDefined(); 
    expect(listResponse.body.products.length).toBe(2); 
    expect(listResponse.body.products[0].name).toBe("Product A");
    expect(listResponse.body.products[1].name).toBe("Product B");
  });
});