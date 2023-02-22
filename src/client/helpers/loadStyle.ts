import fs from "fs";
import path from "path";
import { ROOT_PATH } from "../../../config";

export default function loadStyle(filename: string): string {
  return fs.readFileSync(path.join(ROOT_PATH, "assets", "styles", filename), "utf8");
}
