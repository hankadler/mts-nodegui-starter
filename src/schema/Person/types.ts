export interface Person {
  _id: string;
  name: string;
  birthDate: string;
}

export interface CreatePersonInput {
  name: string;
  birthDate: string;
}

export interface UpdatePersonInput {
  name?: string;
  birthDate?: string;
}

export interface QueryPersonArgs {
  personId: string;
}

export interface CreatePersonArgs {
  createPersonInput: CreatePersonInput;
}

export interface UpdatePersonArgs {
  personId: string;
  updatePersonInput: UpdatePersonInput;
}

export interface DeletePersonArgs {
  personId: string;
}
