import { Component, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "expense-dates",
  templateUrl: "./expense-dates.component.html",
  styleUrls: ["./expense-dates.component.css"]
})
export class ExpenseDatesComponent {

  readonly NEXT = 1;
  readonly PREV = 2;

  userName: string;
  dates: Date[];
  selectedDate: Date;
  title: string;
  constructor(private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string) {
    this.userName = "Admin";
    this.loadData();
    this.title = "Dates";
    
  }

  loadData() {
    //{userName}/dates
    const url = this.baseUrl + "api/Expense/" + this.userName + "/dates";
    this.http.get<Date[]>(url).subscribe(res => {
      this.dates = res;
      this.selectedDate = this.dates.slice(-1)[0];
    }, err => {
      console.log(err);
    });
  }

  onClick(date: Date) {
    this.selectedDate = date;
  }

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
}
