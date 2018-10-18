import { Component, Input } from '@angular/core';
import { CartUpdateService} from '../Shared/cartupdate.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss',
  ],

})

export class HeaderComponent {
  @Input() cartUpdated: Number;
  cartUpdate: Number;
  constructor(private _cartDataService: CartUpdateService) {

  }
}
