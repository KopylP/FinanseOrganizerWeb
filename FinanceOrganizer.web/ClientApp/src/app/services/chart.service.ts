import { Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BarDataModel } from "../interfaces/BarDataModel";
import { Observable } from "rxjs";
@Injectable()
export class ChartService {
  constructor(private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string) { }

  getExpenseBarData(from: string, to: string): Observable<BarDataModel[]> {
    const url = this.baseUrl + "api/charts/expensebar/12-05-2019/20-09-2019";
    return this.http.get<BarDataModel[]>(url);
  }
}
