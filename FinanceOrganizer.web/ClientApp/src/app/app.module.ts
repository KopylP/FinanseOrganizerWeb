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


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    ExpenseDatesComponent,
    ExpenseListComponent,
    ExpenseEditComponent
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
