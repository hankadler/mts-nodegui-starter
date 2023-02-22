import { Context } from "../context";
import { CreatePersonArgs, DeletePersonArgs, QueryPersonArgs, UpdatePersonArgs } from "./types";

const resolvers = {
  Query: {
    people: async (_: any, __: any, context: Context) => context.Person.find(),

    person: async (_: any, { personId }: QueryPersonArgs, { Person }: Context) => {
      if (!personId) return null;
      return Person.findById(personId);
    }
  },

  Mutation: {
    createPerson: async (_: any, { createPersonInput }: CreatePersonArgs, { Person }: Context) => {
      try {
        const person = await Person.create(createPersonInput);
        return {
          success: true,
          message: "Created new person.",
          person
        };
      } catch ({ message }) {
        return {
          success: false,
          message
        };
      }
    },

    updatePerson: async (
      _: any,
      { personId, updatePersonInput }: UpdatePersonArgs,
      { Person }: Context
    ) => {
      if (!personId) {
        return {
          success: false,
          message: "Empty personId!"
        };
      }
      const person = await Person.findByIdAndUpdate(personId, updatePersonInput);
      if (person) {
        return {
          success: true,
          message: "Updated person.",
          person
        };
      }
      return {
        success: false,
        message: "Bad personId!"
      };
    },

    deletePeople: async (_: any, __: any, { Person }: Context) => {
      const { deletedCount } = await Person.deleteMany();
      return {
        success: true,
        message: `Deleted ${deletedCount} people.`
      };
    },

    deletePerson: async (_: any, { personId }: DeletePersonArgs, { Person }: Context) => {
      if (!personId) {
        return {
          success: false,
          message: "Empty personId!"
        };
      }
      const response = await Person.findByIdAndDelete(personId);
      return {
        success: true,
        message: `Deleted ${response ? 1 : 0} person.`
      };
    }
  },
};

export default resolvers;
