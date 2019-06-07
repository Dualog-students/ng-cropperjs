import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { CropitModule } from 'cropit'


@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        CropitModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {

}