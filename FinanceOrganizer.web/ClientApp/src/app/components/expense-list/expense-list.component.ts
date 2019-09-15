import { Component, Inject, OnInit, Input, OnChanges, SimpleChanges } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { formatDate } from "@angular/common";
import { Expense } from "../../interfaces/Expense";
import { ExpenseService } from "../../services/expense.service";
import { trigger, animate, style, transition, state } from "@angular/animations";

@Component({
  selector: "app-expense-list",
  templateUrl: "./expense-list.component.html",
  styleUrls: ["./expense-list.component.css"],
  animations: [trigger("expenseElementTrigger", [
    state('void', style({ opacity: 0 })),
    state('*', style({ opacity: '*' })),
    transition('void => *', animate('0.3s'))
  ])]
})
export class ExpenseListComponent implements OnInit, OnChanges {

  @Input() date: Date;
  userName: string;
  expenses: Expense[];
  
  constructor(private http: HttpClient,
    private router: Router,
    @Inject('BASE_URL') private baseUrl: string,
    private expenseService: ExpenseService) {
    this.userName = "Admin";
    this.date = new Date();
    
  }

  ngOnInit(): void {
    
  }

  onElementDelete(event: any, expense: Expense) {
    let index = this.expenses.indexOf(expense);
    if (index !== -1)
      this.expenses.splice(index, 1);
  }

  get Amount() {
    let sum = 0;
    for (let expense of this.expenses) {
      sum += expense.IsComing ? expense.Cost : -expense.Cost;
    }
    return sum;
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
    this.expenseService.getExpensesByDate(this.userName, this.date).subscribe(res => {
      this.expenses = res;
    }, err => {
      console.log(err);
    });
  }

  

}
