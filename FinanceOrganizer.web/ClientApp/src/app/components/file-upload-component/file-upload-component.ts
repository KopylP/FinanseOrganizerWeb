import { Component, Input, HostListener, ElementRef } from "@angular/core";
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from "@angular/forms";


@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload-component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: FileUploadComponent,
      multi: true
    }
  ],
  styleUrls: ["./file-upload-component.css"]
})
export class FileUploadComponent implements ControlValueAccessor {

    @Input() progress: number;
    onChange : Function;

    writeValue(obj: null): void {
      this.host.nativeElement.value = '';
      this.file = null;
    }
    registerOnChange(fn: Function): void {
        this.onChange = fn;
    }
    registerOnTouched(fn: any): void {
       
    }
    setDisabledState?(isDisabled: boolean): void {
        
    }
  //@Input() progress: any;

  private file: File;

  constructor(private host: ElementRef<HTMLInputElement>) {
    
  }

  @HostListener('change', ['$event.target.files']) emitFiles(event: FileList) {
    const file = event && event.item(0);
    this.onChange(file);
    this.file = file;
  }

}
