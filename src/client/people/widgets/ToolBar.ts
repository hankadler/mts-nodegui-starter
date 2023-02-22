import { QGridLayout, QPushButton, QWidget } from "@nodegui/nodegui";
import { events } from "../../app/store";
import { checkedIds } from "../store";
import { deletePerson } from "../controller";
import AddDialog from "./AddDialog";

export default class ToolBar extends QWidget {
  private widgets = {
    addButton: new QPushButton(),
    deleteButton: new QPushButton(),
    addDialog: new AddDialog()
  };

  private handlers = {
    onClickAdd: async () => {
      this.widgets.addDialog.exec();
    },

    onClickDelete: async () => {
      await Promise.all(Array.from(checkedIds).map((personId) => deletePerson(personId)));
      checkedIds.clear();
      events.emit("toggledAll", false);
      events.emit("refreshPeople");
    },

    onEnableOrDisableDeleteButton: async () => {
      this.widgets.deleteButton.setDisabled(checkedIds.size === 0);
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
