import { QWidget } from "@nodegui/nodegui";

export default class ColorWidget extends QWidget {
  public constructor(color: string) {
    super();
    this.setInlineStyle(`background-color: ${color};`);
  }
}
