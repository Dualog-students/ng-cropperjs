import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CropperComponent } from './cropper/cropper.component';

@NgModule({
  declarations: [CropperComponent],
  imports: [
    CommonModule
  ],
  exports: [CropperComponent]
})
export class CropitModule { }
