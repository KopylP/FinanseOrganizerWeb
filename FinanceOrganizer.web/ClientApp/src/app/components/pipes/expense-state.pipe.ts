import { Pipe, PipeTransform, Injectable } from "@angular/core";
import { Expense } from "../../interfaces/Expense";

@Pipe({
  name: "expenseState"
})
@Injectable()
export class ExpenseStatePipe implements PipeTransform {
  static StateEnum = {
    EXPENSES: "expenses",
    ALL: "all",
    INCOMES: "incomes"
  }; 
  transform(value: Expense[], ...args: any[]) {
    console.log("Expenses state object: " + args[0  ]);
      if (Object.values(ExpenseStatePipe.StateEnum).indexOf(args[0]) >= 0) {
        const val = args[0];
        console.log("Expenses state: " + val);
        switch (val) {
          case ExpenseStatePipe.StateEnum.EXPENSES:
            return value.filter(p => p.IsComing === false);
          case ExpenseStatePipe.StateEnum.INCOMES:
            return value.filter(p => p.IsComing);
        }
    }
    return value;
    }

}
