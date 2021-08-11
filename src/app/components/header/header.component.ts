import {Component} from '@angular/core';
import {NavigationService} from '../../services/navigation.service';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.scss'],
})
export class HeaderComponent {
  constructor(private navigationService: NavigationService) {
  }

  getDay(): string {
    if (this.navigationService.getUrlParam('date')) {
      return this.navigationService.getUrlParam('date').split('-')[2];
    }
    return '';
  }

  getYear(): string {
    if (this.navigationService.getUrlParam('date')){
      return this.navigationService.getUrlParam('date').split('-')[0];
    }
    return this.navigationService.getUrlParam('year-and-month').split('-')[0];
  }

  getMonth(): string {
    if (this.navigationService.getUrlParam('date')){
      return this.navigationService.getUrlParam('date').split('-')[1];
    }
    return this.navigationService.getUrlParam('year-and-month').split('-')[1];
  }
}
