import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { CropperComponent } from 'cropit';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  form: FormGroup = this.fb.group({
    avatar: null
  });

  loading: boolean = false;

  imageUrl = "https://fengyuanchen.github.io/cropperjs/images/picture.jpg"

  // See https://github.com/fengyuanchen/cropperjs#options
  config = {
    aspectRatio: 1,
    initialAspectRatio : 1,
    cropBoxResizable: false,
    responsive: true,

  };

  constructor(private fb : FormBuilder, private httpClient : HttpClient) {
  }

  @ViewChild("fileInput", { static: true }) public fileInput: ElementRef;
  @ViewChild("angularCropper", { static: true }) public angularCropper: CropperComponent;

  onFileChange(event) {
    let reader = new FileReader();
    if(event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.form.get('avatar').setValue({
          filename: file.name,
          filetype: file.type,
          value: reader.result.toString().split(",")[1]
        })
        
        if (/^image\/\w+/.test(file.type)) {
          var newUrl = URL.createObjectURL(file);
          this.angularCropper.imageElement.src = newUrl;
          this.angularCropper.cropper.destroy();
        } else {
          window.alert("Please choose an image file..");
        }
      };
    }
  }

  onSubmit() {
    this.angularCropper.cropper.getCroppedCanvas().toBlob((blob) => {

      // Send the image as a binary to image service
      // the image services only uses stream for receiving the file
      // so this reduces the overhead of having to send it as a base-64string
      // https://www.davidbcalhoun.com/2011/when-to-base64-encode-images-and-when-not-to/
      this.loading = true;
  
      this.httpClient.post("http://localhost:5000/upload/d4620538-4364-44d2-8377-c9c84ee3df44", blob).toPromise()
      .then((ok) => {
          if(ok) {
            window.alert(`Success, image id: ${ok["imageId"]}`);
          }
          this.loading = false;
        })
        .catch((err: HttpErrorResponse) => {
          window.alert(`${err.message}`)
          this.loading = false;
      });
    });
  }

  clearFile() {
    this.form.get('avatar').setValue(null);
    this.fileInput.nativeElement.value = '';
  }
}