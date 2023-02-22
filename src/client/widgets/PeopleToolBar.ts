import { QGridLayout, QPushButton, QWidget } from "@nodegui/nodegui";
import { Promise } from "mongoose";
import { events } from "../globals";
import PeopleContext from "../contexts/PeopleContext";
import { deletePerson } from "../controllers/peopleController";
import PeopleAddDialog from "./PeopleAddDialog";

export default class PeopleToolBar extends QWidget {
  private widgets = {
    addButton: new QPushButton(),
    deleteButton: new QPushButton(),
    addDialog: new PeopleAddDialog()
  };

  private handlers = {
    onClickAdd: async () => {
      this.widgets.addDialog.exec();
    },

    onClickDelete: async () => {
      await Promise.all(
        Array.from(PeopleContext.checkedIds).map((personId) => deletePerson(personId))
      );
      PeopleContext.checkedIds.clear();
      console.log(PeopleContext.checkedIds);
      events.emit("toggledAll", false);
      events.emit("refreshPeople");
    },

    onEnableOrDisableDeleteButton: async () => {
      this.widgets.deleteButton.setDisabled(PeopleContext.checkedIds.size === 0);
    }
  };

  private layouts = {
    rootLayout: new QGridLayout()
  };

  public constructor() {
    super();

    const { addButton, deleteButton } = this.widgets;
    const { onClickAdd, onClickDelete, onEnableOrDisableDeleteButton } = this.handlers;
    const { rootLayout } = this.layouts;

    addButton.setText("New...");
    addButton.setToolTip("Add new person");
    addButton.addEventListener("clicked", onClickAdd);

    deleteButton.setText("Delete");
    deleteButton.setToolTip("Delete person");
    deleteButton.setDisabled(true);
    deleteButton.addEventListener("clicked", onClickDelete);
    events.on("enableOrDisablePeopleDeleteButton", onEnableOrDisableDeleteButton);

    rootLayout.addWidget(addButton, 0, 0);
    rootLayout.addWidget(deleteButton, 0, 1);
    rootLayout.setColumnStretch(2, 1);

    this.setLayout(rootLayout);
  }
}
