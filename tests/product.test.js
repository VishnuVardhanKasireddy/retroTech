const request = require("supertest")
const { app } = require("../src/app")

describe("Product API",()=>{
    test("GET /health should return status OK ",async()=>{

        const response=await request(app).get("/health")

        expect(response.statusCode).toBe(200)
        expect(response.body).toEqual({
            status:"OK!"
        })

    })

    test("GET /api/products returns products",async()=>{
        const response = await request(app)
            .get("/api/products")

        expect(response.statusCode).toBe(200)

    })

    test("GET /api/products/categories returns categories",async()=>{
        const response = await request(app)
            .get("/api/products/categories")

        expect(response.statusCode).toBe(200)
        expect(Array.isArray(response.body)).toBe(true)
    })

    test("GET invalid product returns 404 ",async()=>{
        const response = await request(app)
            .get("/api/products/99999")

        expect(response.statusCode).toBe(404)
    })

    test("POST invalid product returns 400",async()=>{
        const response = await request(app)
            .post("/api/products").send({
                title:"CRT Monitor"
            })

        expect(response.statusCode).toBe(400)
    })

    test("Delete invalid product returns 404",async()=>{
        const response = await request(app)
            .delete("/api/products/99999")

        expect(response.statusCode).toBe(404)
    })
})
