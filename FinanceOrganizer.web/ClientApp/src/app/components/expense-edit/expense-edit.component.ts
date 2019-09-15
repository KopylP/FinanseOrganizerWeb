import { Component, Inject, OnInit, ViewChild, ElementRef } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Expense } from "../../interfaces/Expense";
import { FormBuilder, FormGroup, FormControl, Validators, ReactiveFormsModule } from "@angular/forms";
import { HttpClient, HttpHeaders, HttpEventType } from "@angular/common/http";
import { Photo } from "../../interfaces/Photo";
import { ExpenseService } from "../../services/expense.service";
import { Location } from "@angular/common";
import { Observable } from "rxjs";
import { ConfirmDialogService } from "../../services/confirm-dialog.service";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
  selector: "expense-edit",
  templateUrl: "./expense-edit.component.html",
  styleUrls: ["./expense-edit.component.css"]
})
export class ExpenseEditComponent{

  editMode: boolean;
  expense: Expense;
  public form: FormGroup;
  title: string;
  id: string;
  progress: number;
  isSaved = false;

  constructor(private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    //private router: Router,
    private fb: FormBuilder,
    @Inject('BASE_URL') private baseUrl: string,
    //private location: Location,
    private confirmDialogService: ConfirmDialogService,
    private expenseService: ExpenseService,
    private dialogRef: MatDialogRef<ExpenseEditComponent>,
    @Inject(MAT_DIALOG_DATA) private data) {
    this.createForm();
    this.expense = <Expense>{};
    this.editMode = this.data.editMode;
    this.id = this.data.id;

    if (this.editMode) {
      this.title = "Edit";
      this.loadData();
      
    }
    else {
      this.title = "Create new Expense";
    }

    

  }

  loadData() {
    this.expenseService.get(this.id).subscribe(res => {
      this.expense = res;
      console.log(this.expense);
      this.updateForm();
    });
  }

  createForm() {
    this.form = this.fb.group({
      Name: ["", Validators.required],
      Cost: [0.0, Validators.required],
      IsComing: false,
      Image: [null, this.requiredFileType("jpg", "png", "jpeg")] 
    })
  }

  updateForm() {
    this.form.setValue({
      Name: this.expense.Name,
      Cost: this.expense.Cost,
      IsComing: this.expense.IsComing,
      Image: null
    });
  }

  isFormDirty(): boolean {
    return this.form.dirty;
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

    let tempExp = <Expense>{};
    tempExp.Name = this.form.controls.Name.value;
    tempExp.Cost = this.form.controls.Cost.value;
    tempExp.IsComing = this.form.controls.IsComing.value;
    this.isSaved = true;


    if (this.editMode) {
      tempExp.Id = this.expense.Id;
      tempExp.UserId = this.expense.UserId;
      this.expenseService.post(tempExp).subscribe(res => {
        this.expense = res;
        this.onBack();
        console.log(res.Name + " updated");
        let photo = this.form.controls.Image.value;
        if (photo !== null) {
          this.updatePhoto(photo);
        }
      }, err => {
        console.log(err);
      });
    }
    else {
      
      this.expenseService.put(tempExp).subscribe(res => {
        console.log(res.Name + " added");
        this.expense = res;
        this.isSaved = true;
        let photo = this.form.controls.Image.value;
        console.log(this.form.controls.Image.value);
        if (photo !== null) {
          this.updatePhoto(photo);
        }
        else {
          this.onBack();
        }
      }, err => {
        console.log(err);
      });
    }
  }



  canDeactivate(): boolean | Observable<boolean> {
    if (this.isFormDirty() && !this.isSaved)
      return this.confirmDialogService.openConfirmDialog("Are you sure exit?").afterClosed();
    return true;
  }

  updatePhoto(photo: any) {
    const url = this.baseUrl + "api/Expense/file/load";
    let photoSend = <Photo>{};
    photoSend.PhotoFile = photo;
    photoSend.ExpenseId = this.expense.Id;
    let formData = this.getFormDataByObject(photoSend);
    let headers = new HttpHeaders({
      'Accept': 'application/json'
    });
    let options = { headers: headers };
    this.http.post(url, formData, {
      reportProgress: true,
      observe: 'events'
    }).subscribe(event => {
      console.log(event.type);
      console.log("PLEASE WORK");
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round((100 * event.loaded) / event.total);
          this.onBack();
        }

      }, err => {

      });
  }

  requiredFileType(...a: string[]) {
    return function (control: FormControl) {
      const file = control.value;
      if (file) {
        const extention = file.name.split('.')[1];
        const index = a.findIndex(p => 
          p.toLowerCase() === extention.toLowerCase()
        );
        if (index < 0) {
          return {
            requiredTypeFile: true
          }
        }
        return null;
      }

      return null;
    }
  }

  getFormDataByObject(obj: Photo): FormData {
    let formData = new FormData();
    formData.append("ExpenseId", obj.ExpenseId);
    formData.append("PhotoFile", obj.PhotoFile);
    return formData;
  }

  onBack() {
  //  if (this.editMode)
  //    this.router.navigate(["dates", this.expense.CreatedDate]);
  //  else
    //    this.router.navigate([""]);
    this.dialogRef.close(this.expense);
  }
}
