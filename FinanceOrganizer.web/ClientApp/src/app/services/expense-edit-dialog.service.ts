import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material";
import { ExpenseEditComponent } from "../components/expense-edit/expense-edit.component";

@Injectable()
export class ExpenseEditDialogService {
  constructor(private dialog: MatDialog) { }
  openEditExpenseDialog(mode: boolean, id: string = "") {
    return this.dialog.open(ExpenseEditComponent, {
      width: "500px",
      data: {
        editMode: mode,
        id: id
      },
      disableClose: true
    });
  }
}
