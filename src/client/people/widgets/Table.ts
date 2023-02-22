import { Direction, QBoxLayout, QCheckBox, QGridLayout, QLabel, QStackedWidget, QWidget, WidgetEventTypes } from "@nodegui/nodegui";
import { events } from "../../app/store";
import { getPeople } from "../controller";
import Row from "./Row";
import { Person } from "../../../schema/Person/types";
import { checkedIds, people } from "../store";

export default class Table extends QWidget {
  private state = {
    painted: false
  };

  private widgets = {
    fallbackLabel: new QLabel(),
    allCheckBox: new QCheckBox(),
    personLabel: new QLabel(),
    birthDateLabel: new QLabel(),
    tableWidget: new QWidget(),
    peopleRows: new Set<Row>(),
    stackedWidget: new QStackedWidget()
  };

  private handlers = {
    onPaint: async () => {
      this.state.painted = true;
      this.removeEventListener(WidgetEventTypes.Paint, this.handlers.onPaint);
      await this.handlers.onShow();
    },

    onShow: async () => {
      if (!this.state.painted) return;

      // console.debug("people/table/onShow");

      const { allCheckBox, stackedWidget, tableWidget, peopleRows } = this.widgets;
      const { tableLayout } = this.layouts;

      people.clear();
      peopleRows.forEach((peopleRow) => peopleRow.delete());
      peopleRows.clear();
      allCheckBox.setChecked(false);
      checkedIds.clear();
      (await getPeople()).map((person) => people.add(person));

      // console.debug(Array.from(people));

      if (people.size === 0) {
        stackedWidget.setCurrentIndex(0);
      } else {
        tableWidget.hide();
        Array.from(people).forEach(({ _id, name, birthDate }, row) => {
          peopleRows.add(new Row(_id, name, birthDate, tableLayout, row + 1));
        });
        tableWidget.show();
        stackedWidget.setCurrentIndex(1);
      }
    },

    onCreatePerson: async (person: Person) => {
      people.add(person);
      await this.handlers.onShow();
    },

    onToggleAll: async (checked: boolean) => {
      events.emit("toggledAll", checked);
    }
  };

  private layouts = {
    rootLayout: new QBoxLayout(Direction.TopToBottom),
    tableLayout: new QGridLayout()
  };

  public constructor() {
    super();

    const {
      fallbackLabel,
      allCheckBox,
      personLabel,
      birthDateLabel,
      tableWidget,
      stackedWidget
    } = this.widgets;
    const { onPaint, onShow, onCreatePerson, onToggleAll } = this.handlers;
    const { rootLayout, tableLayout } = this.layouts;

    this.addEventListener(WidgetEventTypes.Paint, onPaint);
    this.addEventListener(WidgetEventTypes.Show, onShow);
    events.on("refreshPeople", onShow);
    events.on("createdPerson", onCreatePerson);

    fallbackLabel.setText("No people yet.");

    allCheckBox.addEventListener("toggled", onToggleAll);
    personLabel.setText("Person");
    personLabel.setInlineStyle("font-weight: bold");
    birthDateLabel.setText("Birthdate");
    birthDateLabel.setInlineStyle("font-weight: bold");

    tableLayout.addWidget(allCheckBox, 0, 0);
    tableLayout.addWidget(personLabel, 0, 1);
    tableLayout.addWidget(birthDateLabel, 0, 2);
    tableLayout.setColumnStretch(3, 1);

    tableWidget.setLayout(tableLayout);

    stackedWidget.addWidget(fallbackLabel);
    stackedWidget.addWidget(tableWidget);

    rootLayout.addWidget(stackedWidget);
    rootLayout.addStretch(1);

    this.setLayout(rootLayout);
  }
}
