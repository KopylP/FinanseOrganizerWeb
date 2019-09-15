import { Component, Input, OnInit, Inject, Output } from "@angular/core";
import { Expense } from "../../interfaces/Expense";
import { Router } from "@angular/router";
import { ConfirmDialogService } from "../../services/confirm-dialog.service";
import { ExpenseService } from "../../services/expense.service";
import { EventEmitter } from '@angular/core';
import { ExpenseEditDialogService } from "../../services/expense-edit-dialog.service";

@Component({
  selector: "expense-list-element",
  templateUrl: "./expense-list.element.component.html",
  styleUrls: ["./expense-list.element.component.css"]
})
export class ExpenseListElementComponent implements OnInit {

  constructor(private router: Router,
    private confirmDialogService: ConfirmDialogService,
    private expenseService: ExpenseService,
    private expenseEditDialogService: ExpenseEditDialogService) {

  }

  @Output("delete") deleteEvent = new EventEmitter<boolean>();

  ngOnInit(): void {        

  }

  changeExpense() {
    this.expenseEditDialogService.openEditExpenseDialog(true, this.expense.Id)
      .afterClosed().subscribe(res => {
        if(res)
          this.expense = res;
      });
  }

  deleteExpense(event: MouseEvent) {
    console.log("i was pressed");
    event.stopPropagation();
    event.preventDefault();
    this.confirmDialogService.openConfirmDialog("Do you want to delete this expense?")
      .afterClosed().subscribe(res => {
        if (res) {
          this.expenseService.delete(this.expense.Id).subscribe(res => console.log("succesfull delete"));
          this.deleteEvent.emit(true);
        }
      });

  }

  @Input() expense: Expense;
}
