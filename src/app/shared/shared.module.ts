import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { SidemenuComponent } from './sidemenu/sidemenu.component';



@NgModule({
  declarations: [
    SidemenuComponent
  ],
  exports: [
    SidemenuComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class SharedModule { }
