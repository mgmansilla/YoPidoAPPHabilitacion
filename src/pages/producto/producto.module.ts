import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductoPage } from './producto';
import { ImagenPipe } from "../../pipes/imagen/imagen";

@NgModule({
  declarations: [
    ProductoPage,
    ImagenPipe,
  ],
  imports: [
    IonicPageModule.forChild(ProductoPage),
  ],
})
export class ProductoPageModule {}
