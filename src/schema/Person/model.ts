import mongoose, { Schema } from "mongoose";
import { Person } from "./types";

const schema: Schema<Person> = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  birthDate: {
    type: String,
    required: true
  }
});

export default mongoose.model("Person", schema);
