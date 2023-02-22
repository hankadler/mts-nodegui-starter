import { Direction,
  QBoxLayout,
  QCheckBox,
  QGridLayout,
  QLabel,
  QStackedWidget,
  QWidget,
  WidgetEventTypes } from "@nodegui/nodegui";
import { events, store } from "../globals";
import { getPeople } from "../controllers/peopleController";
import PeopleRow from "./PeopleRow";
import { Person } from "../../schema/Person/types";

export default class PeopleTable extends QWidget {
  private state = {
    painted: false
  };

  private widgets = {
    fallbackLabel: new QLabel(),
    allCheckBox: new QCheckBox(),
    personLabel: new QLabel(),
    birthDateLabel: new QLabel(),
    tableWidget: new QWidget(),
    peopleRows: [] as PeopleRow[],
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

      console.log("PeopleTable::onShow()");

      const { allCheckBox, stackedWidget, tableWidget, peopleRows } = this.widgets;
      const { tableLayout } = this.layouts;

      peopleRows.forEach((peopleRow) => peopleRow.close()); // !!!
      store.people = await getPeople();

      console.log(store.people.map(({ name }) => name));

      allCheckBox.setChecked(false);

      if (store.people.length === 0) {
        stackedWidget.setCurrentIndex(0);
      } else {
        tableWidget.hide();
        peopleRows.length = 0;
        store.people.forEach(({ _id, name, birthDate }, row) => {
          peopleRows.push(new PeopleRow(_id, name, birthDate, tableLayout, row + 1));
        });
        tableWidget.show();
        stackedWidget.setCurrentIndex(1);
      }
    },

    onCreatePerson: async (person: Person) => {
      store.people.push(person);
      // const { peopleRows } = this.widgets;
      // const { _id, name, birthDate } = person;
      // const row = store.people.length + 1;
      // peopleRows.push(new PeopleRow(_id, name, birthDate, this.layouts.tableLayout, row));
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
