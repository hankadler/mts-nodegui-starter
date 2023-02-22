import gql from "graphql-tag";

const typeDefs = gql`
  extend type Query {
    people: [Person!]!
    person(personId: ID!): Person
  }

  extend type Mutation {
    createPerson(createPersonInput: CreatePersonInput!): PersonMutationOutput!
    updatePerson(personId: ID!, updatePersonInput: UpdatePersonInput!): PersonMutationOutput!
    deletePeople: PersonMutationOutput!
    deletePerson(personId: ID!): PersonMutationOutput!
  }

  type Person {
    _id: ID!
    name: String!
    birthDate: String!
  }

  type PersonMutationOutput implements MutationOutput {
    success: Boolean!
    message: String!
    person: Person
  }

  input CreatePersonInput {
    name: String!
    birthDate: String!
  }

  input UpdatePersonInput {
    name: String
    birthDate: String
  }
`;

export default typeDefs;
