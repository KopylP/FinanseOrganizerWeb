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
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule, MatDatepickerIntl } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from "@angular/material/radio";
import { MatNativeDateModule } from '@angular/material/core';
import { ExpenseListElementComponent } from './components/expense-list-element/expense-list.element.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { SaveInformationWarnGuard } from './components/guards/save-information-warn.guard';
import { MatDialogModule } from '@angular/material';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { ConfirmDialogService } from './services/confirm-dialog.service';
import { ExpenseEditDialogService } from './services/expense-edit-dialog.service';
import { MatButtonToggleModule } from '@angular/material/button-toggle'; 
import { ExpenseStatePipe } from './components/pipes/expense-state.pipe';
import { ChartHolderComponent } from './components/chart-holder/chart-holder.component';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';
import { ChartService } from './services/chart.service';
@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    ExpenseDatesComponent,
    ExpenseListComponent,
    ExpenseEditComponent,
    FileUploadComponent,
    ConfirmDialogComponent,
    ExpenseListElementComponent,
    ChartHolderComponent,
    BarChartComponent,
    ExpenseStatePipe
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    FormsModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatRadioModule,
    MatInputModule,
    MatNativeDateModule,
    MatSlideToggleModule,
    BrowserAnimationsModule,
    MatButtonToggleModule,
    RouterModule.forRoot([
      { path: '', component: ExpenseDatesComponent, pathMatch: 'full' },
      { path: 'dates/:date', component: ExpenseDatesComponent },
      { path: 'charts', component: ChartHolderComponent }
      //{ path: 'expense/create', component: ExpenseEditComponent, canDeactivate: [SaveInformationWarnGuard] },
      //{ path: 'expense/edit/:id', component: ExpenseEditComponent, canDeactivate: [SaveInformationWarnGuard] }

    ])
  ],
  exports: [
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatButtonToggleModule
  ],
  providers: [ExpenseService,
    MatDatepickerIntl,
    SaveInformationWarnGuard,
    ConfirmDialogService,
    ExpenseEditDialogService,
    ChartService],
  bootstrap: [AppComponent],
  entryComponents: [ConfirmDialogComponent,
    ExpenseEditComponent]
})
export class AppModule { }
