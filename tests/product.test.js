const mongoose = require("mongoose");
const request = require("supertest");
const Products = require('../models/product.model')
const { ObjectId } = require('mongoose').Types;
const exception = require('../controllers/product.controller')
const app = require("../app");

beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI);
  });
  let products1;
  let products2;
  beforeAll(async () => {
    products1 = await Products.create({
            _id:ObjectId('6390c2e222d1dfdd05cd6a8f'),
            name:"Book 1",
            price: 50,
            description: " New description."
    })
     products2 = await Products.create(
        {
            _id:ObjectId('6390c3565eb451000e5ff38d'),
            name:"Book 2",
            price: 30,
            description: " New description."
        }
    )
})
  describe("GET /api/products", () => {
    it("should return all products", async () => {
      const res = await request(app).get("/api/products");
      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBeGreaterThan(0);
    });
  });

  describe("POST /api/products",() => {
    it("should post a product", async () => {
        const res = await request(app).post('/api/products').send({
            name:"Product 2",
            price: 30,
            description: "new model."
        })
        expect(res.statusCode).toBe(201)
        expect(res.body.name).toBe('Product 2')
    })
  })

  describe.only("GET /products/:id", () => {
    it("should get specefic product.", async () =>{
        const res = await request(app).get(`/api/products/${products1._id}`)
        expect(res.statusCode).toBe(200)
    })
})
describe("PATCH /products/:id", () => {
    it("should uptate a product.", async () => {
        const res = await request(app).patch(`/api/products/${products2._id}`).send({
            name: "Product 4",
            price: 104,
            description: "Description 4",
        });
        expect(res.statusCode).toBe(200)
    })
    it.todo('new test is needed.');
  })
  describe.each([
    [1, 1, 2],
    [1, 2, 3],
    [2, 1, 3],
  ])('.add(%i, %i)', (a, b, expected) => {
    test(`returns ${expected}`, () => {
      expect(a + b).toBe(expected);
    });
  });
  test.concurrent('addition of 2 numbers', async () => {
    expect(5 + 3).toBe(8);
  });
  
  
  test.concurrent('subtraction 2 numbers', async () => {
    expect(5 - 3).toBe(2);
  });



  test('numbers matcher', () => {
    const n = 4+5;
    expect(n).toBeLessThanOrEqual(9)
    
  });
  test('string matcher', () => {
    expect('Aqida').toMatch('Aqida')
    expect('Aqida').toMatch(/i/)

  })

  test('array matcher', () => {
    const names = ['aqida', 'sara', 'marjan']
    expect(names).toContain('aqida')
  })
  function exeption() {
    throw new Error('you are using the wrong JDK!');
  }
  test('exception matcher', () => {
    expect(()=>exeption()).toThrow(Error)
  })

  const obj = {
    name: 'aqida',
    lastName: 'Haidari'

  }
  test('test object', () => {
    expect(obj).toBe({name:'aqida', lastName: 'Haidari'})
  })
  afterAll(async () => {
    await Products.deleteMany()

})
  /* Closing database connection after each test. */
//   afterEach(async () => {
//       await mongoose.connection.close();
//     });

const getData = () => {
    return new Promise ((resolve, reject) => {
      //some request to the endpoint;
       const data = "something"
      if(data == "something"){
        resolve(data);
      }
      else{
        reject();
      }
    });
 };

 test('promis', () => {
    return getData().then(data=>{
        expect(data).toMatch('something')
    })
 })

 test('async', async () => {
    const data = await getData();
    expect(data).toMatch('something')
 })

require("dotenv").config();