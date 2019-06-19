import { Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Expense } from "../interfaces/Expense";
import { Observable } from "rxjs";
import { formatDate } from "@angular/common";

@Injectable()
export class ExpenseService {

  url: string;
  constructor(@Inject('BASE_URL') private baseUrl: string,
    private http: HttpClient) {
    this.baseUrl = this.baseUrl + "api/Expense/";
  }

  get(id: string): Observable<Expense> {
    const url = this.baseUrl + id;
    return this.http.get<Expense>(url);
  }

  put(expense: Expense): Observable<Expense> {
    return this.http.put<Expense>(this.baseUrl, expense);
  }

  post(expense: Expense): Observable<Expense> {
    return this.http.post<Expense>(this.baseUrl, expense);
  }

  delete(expenseId: string): Observable<any> {
    return this.http.delete(this.baseUrl + expenseId);
  }

  getExpensesByDate(userName: string, date: Date): Observable<Expense[]> {
    const url = this.baseUrl  + userName + "/dates/" + formatDate(date, "yyyy-MM-dd", "En");
    return this.http.get<Expense[]>(url);
  }

  getDates(userName: string): Observable<Date[]> {
    const url = this.baseUrl + userName + "/dates";
    return this.http.get<Date[]>(url);
  }
}
