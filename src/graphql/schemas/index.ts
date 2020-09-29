import { buildSchema } from 'graphql'

const graphSchema = buildSchema(`
    
    type Product {
        name: String!
    }

    type Employee {
        name: String!
    }

    type Organization {
        _id: ID!
        organization: String!
        products: [Product!]
        address: String!
        employees: [Employee!]
        marketValue: String!
        ceo: String!
        country: String!
        createdAt: String!
        updatedAt: String!
    }

    type User {
        _id: ID!
        username: String!
        password: String
    }

    type AuthData {
        userID: ID!
        token: String!
        tokenExpiration: Int!

    }

    input EmployeeInputData {
        name: String!
    }


    input ProductInputData {
        name: String!
    }

    input CompanyInputData {
        organization: String!
        products: [ProductInputData!]!
        address: String!
        employees: [EmployeeInputData!]!
        marketValue: String!
        ceo: String!
        country: String!
    }

    input OrganizationUpdateData {
        organizationNameToUpdate: String!
        organization: String!
        products: [ProductInputData!]!
        address: String!
        employees: [EmployeeInputData!]!
        marketValue: String!
        ceo: String!
        country: String!
    }

    input UserInputData {
        username: String!
        password: String!
    }

    input updateUserInputData {
        username: String!
        newUsername: String!
        newPassword: String!
    }

    type RootQuery {
        getOrganizations: [Organization!]
        getOrganizationByName(organizationName: String!): Organization
        login(username: String!, password: String!): AuthData
    }

    type RootMutation {
        createOrganization(companyInput: CompanyInputData): Organization
        updateOrganization(organizationInfo: OrganizationUpdateData!): Organization
        removeOrganization(organizationName: String!): Organization
        createUser(userInput: UserInputData): User!
        updateUser(updateUserInput: updateUserInputData!): User
        removeUser(userName: String!): User
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);


export default graphSchema