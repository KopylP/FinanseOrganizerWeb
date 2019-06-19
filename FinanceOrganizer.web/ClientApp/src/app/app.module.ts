import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { ExpenseDatesComponent } from './components/expense-dates/expense-dates.component';
import { ExpenseListComponent } from './components/expense-list/expense-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExpenseEditComponent } from './components/expense-edit/expense-edit.component';
import { FileUploadComponent } from './components/file-upload-component/file-upload-component';
import { ExpenseService } from './services/expense.service';


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    ExpenseDatesComponent,
    ExpenseListComponent,
    ExpenseEditComponent,
    FileUploadComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: ExpenseDatesComponent, pathMatch: 'full' },
      { path: 'expense/create', component: ExpenseEditComponent },
      { path: 'expense/edit/:id', component: ExpenseEditComponent }
    ])
  ],
  providers: [ExpenseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
