import { Component, ViewChild } from '@angular/core';
import { CropperComponent } from 'cropit';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'CropIt';

  @ViewChild("angularCropper", {static:true}) public angularCropper: CropperComponent;

  mordi(event) {

    var file = event["srcElement"]["files"][0];

    var mordi = this.angularCropper.cropper.getCanvasData();
  }
}