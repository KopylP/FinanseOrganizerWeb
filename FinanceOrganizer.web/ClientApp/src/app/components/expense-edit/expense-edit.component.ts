import { Component, Inject } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Expense } from "../../interfaces/Expense";
import { FormBuilder, FormGroup, FormControl, Validators, ReactiveFormsModule } from "@angular/forms";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "expense-edit",
  templateUrl: "./expense-edit.component.html",
  styleUrls: ["./expense-edit.component.html"]
})
export class ExpenseEditComponent {

  editMode: boolean;
  expense: Expense;
  public form: FormGroup;
  title: string;
  id: string;
  constructor(private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private fb: FormBuilder,  
    @Inject('BASE_URL') private baseUrl: string) {
    this.createForm();
    this.expense = <Expense>{};
    this.editMode = (this.activatedRoute.snapshot.url[1].path === 'edit');
    this.id = activatedRoute.snapshot.params["id"];
    
    if (this.editMode) {
      this.title = "Edit";
      this.loadData();
      
    }
    else {
      this.title = "Create new Expense";
    }
  }

  loadData() {
    const url = this.baseUrl + "api/Expense/" + this.id;
    this.http.get<Expense>(url).subscribe(res => {
      this.expense = res;
      this.updateForm();
    });
  }

  createForm() {
    this.form = this.fb.group({
      Name: ["", Validators.required],
      Cost: [0.0, Validators.required],
      IsComing: false
    })
  }

  updateForm() {
    this.form.setValue({
      Name: this.expense.Name,
      Cost: this.expense.Cost,
      IsComing: this.expense.IsComing
    });
  }

  getFormControl(name: string) {
    return this.form.get(name);
  }

  isValid(name: string) {
    var e = this.getFormControl(name);
    return e && e.valid;
  }

  isChanged(name: string) {
    var e = this.getFormControl(name);
    return e && (e.dirty || e.touched);
  }

  hasError(name: string) {
    var e = this.getFormControl(name);
    return e && (e.dirty || e.touched) && !e.valid;
  }

  onSubmit() {
    const url = this.baseUrl + "api/Expense/";
    let tempExp = <Expense>{};
    tempExp.Name = this.form.controls.Name.value;
    tempExp.Cost = this.form.controls.Cost.value;
    tempExp.IsComing = this.form.controls.IsComing.value;
    if (this.editMode) {
      tempExp.Id = this.expense.Id;
      tempExp.UserId = this.expense.UserId;
      this.http.post<Expense>(url, tempExp).subscribe(res => {
        console.log(res.Name + " updated");
      }, err => {
        console.log(err);
      });
    }
    else {
      //TODO
      this.http.put<Expense>(url, tempExp).subscribe(res => {
        console.log(res.Name + " added");
      }, err => {
        console.log(err);
      });
    }
    this.onBack();
  }

  onBack() {
    //TODO
    this.router.navigate([""]);
    
  }

}
