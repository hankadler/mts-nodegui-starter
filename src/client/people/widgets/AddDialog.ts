import { QDate, QDateEdit, QDialog, QGridLayout, QLabel, QLineEdit, QPushButton } from "@nodegui/nodegui";
import { CreatePersonInput } from "../../../schema/Person/types";
import { createPerson } from "../controller";
import { events } from "../../app/store";

export default class AddDialog extends QDialog {
  private widgets = {
    nameLabel: new QLabel(),
    nameEdit: new QLineEdit(),
    dateLabel: new QLabel(),
    dateEdit: new QDateEdit(),
    okButton: new QPushButton(),
    cancelButton: new QPushButton()
  };

  private handlers = {
    onChangeName: async (name: string) => {
      this.widgets.okButton.setDisabled(name.length === 0);
    },

    onClickOK: async () => {
      const name = this.widgets.nameEdit.text();
      const qDate = this.widgets.dateEdit.date();
      const birthDate = `${qDate.month()}/${qDate.day()}/${qDate.year()}`;
      const createPersonInput: CreatePersonInput = {
        name,
        birthDate
      };
      const person = await createPerson(createPersonInput);
      events.emit("createdPerson", person);
      await this.handlers.onClickCancel();
    },

    onClickCancel: async () => {
      this.widgets.nameEdit.setText("");
      this.widgets.dateEdit.setDate(new QDate());
      this.close();
    }
  };

  private layouts = {
    rootLayout: new QGridLayout()
  };

  public constructor() {
    super();

    const { nameLabel, nameEdit, dateLabel, dateEdit, okButton, cancelButton } = this.widgets;
    const { onChangeName, onClickOK, onClickCancel } = this.handlers;
    const { rootLayout } = this.layouts;

    nameLabel.setText("Name:");
    nameEdit.addEventListener("textChanged", onChangeName);

    dateLabel.setText("Birthdate:");
    dateEdit.setDate(new QDate());

    okButton.setText("OK");
    okButton.addEventListener("clicked", onClickOK);

    cancelButton.setText("Cancel");
    cancelButton.addEventListener("clicked", onClickCancel);

    rootLayout.addWidget(nameLabel, 0, 0, 1, 2);
    rootLayout.addWidget(nameEdit, 1, 0, 1, 2);
    rootLayout.addWidget(dateLabel, 2, 0, 1, 2);
    rootLayout.addWidget(dateEdit, 3, 0, 1, 2);
    rootLayout.addWidget(okButton, 4, 0);
    rootLayout.addWidget(cancelButton, 4, 1);

    this.setWindowTitle("Add Person");
    this.setLayout(rootLayout);
  }
}
