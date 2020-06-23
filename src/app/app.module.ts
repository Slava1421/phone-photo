import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CameraModule } from 'src/modules/camera/camera.module';
import { StartPageModule } from 'src/modules/start-page/start-page.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CameraModule,
    StartPageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
