import path from "path";
import { ROOT_PATH } from "../../../config";
import { fetchGraphQL, parseOperations } from "../utils";
import { CreatePersonInput, Person, UpdatePersonInput } from "../../schema/Person/types";

const {
  GetPeople,
  GetPerson,
  CreatePerson,
  UpdatePerson,
  DeletePerson
} = parseOperations(path.join(ROOT_PATH, "assets", "people", "operations.graphql"));

export const getPeople = async (): Promise<[Person]> => {
  const { people } = await fetchGraphQL(GetPeople);
  return people;
};

export const getPerson = async (personId: string): Promise<[Person]> => {
  const { person } = await fetchGraphQL(GetPerson, { personId });
  return person;
};

export const createPerson = async (createPersonInput: CreatePersonInput): Promise<Person> => {
  const { createPerson: { person } } = await fetchGraphQL(CreatePerson, { createPersonInput });
  return person;
};

export const updatePerson = async (
  personId: string,
  updatePersonInput: UpdatePersonInput
): Promise<Person> => {
  const { updatePerson: { person } } = await fetchGraphQL(UpdatePerson, {
    personId,
    updatePersonInput
  });
  return person;
};

export const deletePerson = async (personId: string): Promise<boolean> => {
  const { deletePerson: { success } } = await fetchGraphQL(DeletePerson, { personId });
  return success;
};
