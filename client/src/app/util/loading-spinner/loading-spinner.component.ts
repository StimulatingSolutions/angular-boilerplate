import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { trigger, state, style, animate, transition } from '@angular/animations';


@Component({
  selector: 'loading-spinner',
  templateUrl: './loading-spinner.component.pug',
  styleUrls: ['./loading-spinner.component.scss'],
  // the animation definitions below greatly alleviate the flicker that would otherwise be very obvious for short-lived loads
  animations: [
    trigger('fadeIn', [
      state('active', style({opacity: 1.0})),
      transition(':enter', [
        style({opacity: 0.0}),
        animate('250ms ease-in')
      ]),
      transition(':leave', animate('50ms ease-out', style({opacity: 0.0})))
    ])
  ]
})
export class LoadingSpinnerComponent {

  @Input() observe: Observable<any>;
  public state: string = 'active';

}
