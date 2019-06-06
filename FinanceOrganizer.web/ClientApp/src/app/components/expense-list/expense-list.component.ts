import { Component, Inject, OnInit, Input, OnChanges, SimpleChanges } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { formatDate } from "@angular/common";
import { Expense } from "../../interfaces/Expense";

@Component({
  selector: "app-expense-list",
  templateUrl: "./expense-list.component.html",
  styleUrls: ["./expense-list.component.css"]
})
export class ExpenseListComponent implements OnInit, OnChanges {

  @Input() date: Date;
  userName: string;
  expenses: Expense[];
  
  constructor(private http: HttpClient,
    private router: Router,
    @Inject('BASE_URL') private baseUrl: string) {
    this.userName = "Admin";
    this.date = new Date();
    
  }

  ngOnInit(): void {
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("in ngOnChanges");
    if (typeof changes['date'] !== 'undefined') {
      console.log("in first if");
      console.log("in second if");
      this.loadData();
      
    }
  }

  loadData(): void {
    console.log(window.navigator.languages[0]);
    const url = this.baseUrl + "api/Expense/" + this.userName + "/dates/" + formatDate(this.date, "yyyy-MM-dd", "En");
    console.log(url);
    this.http.get<Expense[]>(url).subscribe(res => {
      this.expenses = res;
    }, err => {
      console.log(err);
    });
  }

}
