import path from "path";
import { QPixmap } from "@nodegui/nodegui";
import { ROOT_PATH } from "../../../config";

export default function createPixmap(filename: string): QPixmap {
  return new QPixmap(path.join(ROOT_PATH, "assets", "images", filename));
}
