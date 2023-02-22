import { QCheckBox, QGridLayout, QLineEdit, QWidget } from "@nodegui/nodegui";
import PeopleContext from "../contexts/PeopleContext";
import { events } from "../globals";

export default class PeopleRow extends QWidget {
  private widgets = {
    checkBox: new QCheckBox(),
    nameEdit: new QLineEdit(),
    birthDateEdit: new QLineEdit(),
  };

  private handlers = {
    onToggle: async (checked: boolean, _id: string) => {
      PeopleContext.checkedIds.delete(_id);
      if (checked) {
        PeopleContext.checkedIds.add(_id);
      }
      console.log({
        checked,
        ids: PeopleContext.checkedIds
      });
      events.emit("enableOrDisablePeopleDeleteButton");
    },

    onToggleAll: async (checked: boolean) => {
      this.widgets.checkBox.setChecked(checked);
    }
  };

  public constructor(
    _id: string,
    name: string,
    birthDate: string,
    tableLayout: QGridLayout,
    row: number
  ) {
    super();

    const { checkBox, nameEdit, birthDateEdit } = this.widgets;

    const { onToggle, onToggleAll } = this.handlers;

    checkBox.addEventListener("toggled", async (checked) => onToggle(checked, _id));
    events.on("toggledAll", onToggleAll);

    nameEdit.setText(name);
    nameEdit.setReadOnly(true);

    birthDateEdit.setText(birthDate);
    birthDateEdit.setReadOnly(true);

    tableLayout.addWidget(checkBox, row, 0);
    tableLayout.addWidget(nameEdit, row, 1);
    tableLayout.addWidget(birthDateEdit, row, 2);
  }

  public close(): boolean {
    Object.values(this.widgets).forEach((widget) => widget.close());
    return super.close();
  }
}
