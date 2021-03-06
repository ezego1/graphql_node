/**
 * @jest-environment node
 *
 */
import config from "../config/index";
import JWT from "jsonwebtoken";
import Bcrypt from "bcryptjs";
import supertest from "supertest";
import server from "../app";
import mongoose from "mongoose";
import User from "../model/User.model";
import Company from "../model/Company.model";

const app = () => supertest(server);

let token;
let currentUser;
let user = "testuser";
let password = "password";

describe("The GraphQL API", () => {
  beforeAll(async () => {
    await User.deleteMany({});
    await Company.deleteMany({});
  });

  test("Should register a user", async () => {
    const query = `
      mutation{
  createUser(userInput: {username: "testuser", password: "password"}){
    _id
    username
    password
  }
}
    `;

    const response = await app().post("/graphql").send({ query });
    currentUser = response.body.data.createUser;

    expect(currentUser._id).toBeDefined();
    expect(currentUser.username).toEqual(user);
  });

  test("User password should be hashed before save", () => {
    expect(Bcrypt.compareSync(password, currentUser.password)).toBe(true);
  });

  test("It should generate a valid Jsonwebtoken on login", async () => {
    const query = `
    query{
  login(username: "testuser", password: "password"){
    userID
    token
    tokenExpiration
  }
}
    `;
    const response = await app()
      .post("/graphql")
      .set("Authorization", `Bearer ${token}`)
      .send({ query });

    token = response.body.data.login.token;
    let id = response.body.data.login.userID;

    const decoded = JWT.verify(token, config.secretKey);

    expect(id).toEqual(decoded["userId"]);
  });

  test("It should require a token for authentication", async () => {
    const query = `
    query{
  getOrganizations{
  _id
    organization
    products{
      name
    }
     employees{
      name
    }
    marketValue
    ceo
    country
    createdAt
    updatedAt
  }
}
    `;

    const response = await app().post("/graphql").send({ query });

    expect(response.body.errors[0].message).toEqual(
      "Unauthenticated, access Denied!"
    );
  });

  test("It should create an organization", async () => {
    const query = `
    mutation{
  createOrganization(companyInput: {
    organization: "DOVE_TV",
    products: {name: "heaven"},
    address: "KM 3 Lagos Ibadan Express"
    employees: {name: "Pastors"},
    marketValue: "98%",
    ceo: "Daddy G.O",
    country: "Nigeria"
  }){
    _id
    organization
    products{
       name
    }
    address
    employees{
      name
    }
    marketValue
    ceo
    country
    createdAt
    updatedAt
  }
}
    `;
    const response = await app()
      .post("/graphql")
      .set("Authorization", `Bearer ${token}`)
      .send({ query });
    expect(response.status).toBe(200);
    expect(response.type).toBe("application/json");
    const created = response.body.data.createOrganization;
    expect(created).toHaveProperty("_id");
    expect(created).toHaveProperty("organization");
    expect(created).toHaveProperty("ceo");
    expect(created).toHaveProperty("country");
    expect(created).toHaveProperty("marketValue");
  });

  test("It should get all available organization", async () => {
    const query = `
    query{
  getOrganizations{
  _id
    organization
    products{
      name
    }
     employees{
      name
    }
    marketValue
    ceo
    country
    createdAt
    updatedAt
  }
}
    `;

    const response = await app()
      .post("/graphql")
      .set("Authorization", `Bearer ${token}`)
      .send({ query });
    expect(response.type).toBe("application/json");
    expect(response.status).toBe(200);

    // expect(response.body[0]).toHaveProperty("_id");
  });

  test("It should get Organization by Name", async () => {
    const query = `
    query{
  getOrganizationByName(organizationName: "DOVE_TV"){
    _id
    organization
    address
    marketValue
    ceo
    country
    createdAt
  }
}
    `;
    const response = await app()
      .post("/graphql")
      .set("Authorization", `Bearer ${token}`)
      .send({ query });
    expect(response.status).toBe(200);
    expect(response.type).toBe("application/json");
    const organization = response.body.data.getOrganizationByName;
    expect(organization).toHaveProperty("_id");
    expect(organization).toHaveProperty("organization");
    expect(organization).toHaveProperty("ceo");
    expect(organization).toHaveProperty("country");
    expect(organization).toHaveProperty("marketValue");
  });

  test("It should update an organization", async () => {
    const query = `
   mutation{
  updateOrganization(organizationInfo:{
    organizationNameToUpdate: "DOVE_TV",
    organization: "DOVE",
    products: {name: "channel 24"},
    address: "KM 3 Lagos Ibadan Express",
     employees: {name: "Ministers"},
    marketValue: "100%",
    ceo: "Daddy G.O",
     country: "Nigeria"
  }){
    _id
    organization
    products{
       name
    }
    address
    employees{
      name
    }
    marketValue
    ceo
    country
    createdAt
    updatedAt
  }
}
    `;
    const response = await app()
      .post("/graphql")
      .set("Authorization", `Bearer ${token}`)
      .send({ query });
    expect(response.status).toBe(200);
    expect(response.type).toBe("application/json");
    const updated = response.body.data.updateOrganization;
    expect(updated).toHaveProperty("_id");
    expect(updated).toHaveProperty("organization");
    expect(updated).toHaveProperty("ceo");
    expect(updated).toHaveProperty("country");
    expect(updated).toHaveProperty("marketValue");
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });
});
