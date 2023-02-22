import Person from "./Person";

const resolvers = {
  Query: {
    ...Person.resolvers.Query
  },

  Mutation: {
    ...Person.resolvers.Mutation
  }
};

export default resolvers;
