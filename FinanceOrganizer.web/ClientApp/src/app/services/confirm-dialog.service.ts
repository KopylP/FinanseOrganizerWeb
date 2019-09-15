import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material";
import { ConfirmDialogComponent } from "../components/confirm-dialog/confirm-dialog.component";

@Injectable()
export class ConfirmDialogService {
  constructor(private dialog: MatDialog) {}
  openConfirmDialog(msg: String) {
    return this.dialog.open(ConfirmDialogComponent, {
      disableClose: true,
      width: "400px",
      data: {
        message: msg
      }
    });
  }
}
