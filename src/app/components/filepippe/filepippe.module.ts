import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileSizePipe } from 'src/app/file-size.pipe';


@NgModule({
  declarations: [
    FileSizePipe
  ],
  imports: [
    CommonModule
  ],
  exports:[
    FileSizePipe
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FilepippeModule { }
