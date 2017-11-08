import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReadingWatcherPage } from './reading-watcher';

@NgModule({
  declarations: [
    ReadingWatcherPage,
  ],
  imports: [
    IonicPageModule.forChild(ReadingWatcherPage),
  ],
})
export class ReadingWatcherPageModule {}
