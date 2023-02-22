import gql from "graphql-tag";
import Person from "./Person";

export default gql`
  type Query 

  type Mutation 
 
  interface MutationOutput {
    success: Boolean!
    message: String
  }

  ${Person.typeDefs}
`;
