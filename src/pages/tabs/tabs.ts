import { Component } from '@angular/core';

import { BooksPage } from '../books/books';

import { LovePage } from '../love/love';
import { SearchPage } from '../search/search';
import {NotificationsPage} from '../notifications/notifications';
import {SchoolPage} from '../school/school';

/*
 Generated class for the Tabs page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {

  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab2Root: any = BooksPage;
  tab3Root: any = NotificationsPage;
  tab4Root: any = SchoolPage;
  tab5Root: any = SearchPage;

  constructor() {

  }

}
