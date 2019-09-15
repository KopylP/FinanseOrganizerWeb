import { Component, Inject, ViewChild } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ExpenseService } from "../../services/expense.service";
import { Data, ActivatedRoute } from "@angular/router";
import { ExpenseEditDialogService } from "../../services/expense-edit-dialog.service";
import { ExpenseListComponent } from "../expense-list/expense-list.component";


@Component({
  selector: "expense-dates",
  templateUrl: "./expense-dates.component.html",
  styleUrls: ["./expense-dates.component.css"],
})
export class ExpenseDatesComponent {

  readonly NEXT = 1;
  readonly PREV = 2;

  userName: string;
  dates: Date[];
  selectedDate: Date;
  title: string;
  @ViewChild(ExpenseListComponent)
  private expenseListComponent: ExpenseListComponent;
  constructor(private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string,
    private expenseService: ExpenseService,
    private route: ActivatedRoute,
    private expenseEditDialogService: ExpenseEditDialogService) {
    this.userName = "Admin";
    this.loadData();
    this.title = "Dates";
    this.dateFilter = this.dateFilter.bind(this);
    
  }

  loadData() {
    //{userName}/dates
    this.expenseService.getDates(this.userName).subscribe(res => {
      this.dates = res;
      console.log(this.dates);
      if (this.route.snapshot.params["date"]) {
        console.log("I am here and i am work");
        let date = this.route.snapshot.params["date"];
        let dateObj = new Date(Date.parse(date));
        this.selectedDate = date;
      }
      if (this.selectedDate) {
        console.log("Selected date is not null");
        if (this.selectedDate === this.dates.slice(-1)[0]) {
          this.expenseListComponent.loadData();
        }
        else {
          this.selectedDate = this.dates.slice(-1)[0];
        }
      }
      else
        this.selectedDate = this.dates.slice(-1)[0];
    }, err => {
      console.log(err);
    });
  }

  onClick(date: Date) {
    this.selectedDate = date;
  }

  dateFilter = (date: Date): boolean => {
    for (var d of this.dates) {
      const date1 = new Date(d);
      if (date1.getTime() === date.getTime()) {
        return true;
      };
    }
    return false;
  }

  onChangeDateInPicker = (date: Date) => {
    this.selectedDate = date;
  };

  changeDate(choice: number) {
    let index = this.dates.indexOf(this.selectedDate);
    switch (choice) {
      case this.PREV:
        --index;
        index = index < 0 ? this.dates.length - 1 : index;
        break;
      case this.NEXT:
        ++index;
        index = index % this.dates.length;
        break;
    }
    this.selectedDate = this.dates[index];
  }

  createExpense() {
    this.expenseEditDialogService.openEditExpenseDialog(false)
      .afterClosed().subscribe(res => {
        if (res)
          this.loadData();
      });
  }

}
