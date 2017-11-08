import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConsoleLogPage } from './console-log';

@NgModule({
  declarations: [
    ConsoleLogPage,
  ],
  imports: [
    IonicPageModule.forChild(ConsoleLogPage),
  ],
})
export class ConsoleLogPageModule {}
