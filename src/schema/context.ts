import { Request, Response } from "express";
import { Model } from "mongoose";
import { NODE_ENV } from "../../config";
import { Person as PersonType } from "./Person/types";
import Person from "./Person/model";
import peopleVariables from "../../assets/people/variables";

export interface Context {
  Person: Model<PersonType>
}

interface ContextOptions {
  req: Request,
  res: Response
}

const _setVariables = async (req: Request) => {
  const people = await Person.find();
  if (people.length) {
    peopleVariables.personId = (await Person.find()).slice(-1)[0]._id.toString() || "";
  }
  req.body.variables = {
    ...peopleVariables,
    ...req.body.variables
  };
};

const context = async ({ req }: ContextOptions): Promise<Context> => {
  // WARNING: for use during DEVELOPMENT only!
  if (!NODE_ENV.startsWith("prod")) await _setVariables(req);
  return { Person };
};

export default context;
