import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { ExpenseEditComponent } from "../expense-edit/expense-edit.component";
import { Observable, of } from "rxjs";

export class SaveInformationWarnGuard implements CanDeactivate<ExpenseEditComponent> {
  canDeactivate(component: ExpenseEditComponent, 
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | Observable<boolean> {
    return component.canDeactivate ? component.canDeactivate() : true;
}
}
