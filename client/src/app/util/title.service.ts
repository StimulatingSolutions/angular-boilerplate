// Credits and thanks:
//   https://toddmotto.com/dynamic-page-titles-angular-2-router-events
//   https://stackoverflow.com/questions/34597835/how-to-get-current-route
//   https://gist.github.com/pini-girit/2303195c240add54ae8ce68d78e0fe03
//
import {Injectable} from '@angular/core';

import {Title} from '@angular/platform-browser';
import {Router, NavigationEnd, ActivatedRoute} from '@angular/router';
import {filter, map, switchMap} from 'rxjs/operators';

const BASE_TITLE = 'YAMB';
const SEPARATOR = ' - ';

@Injectable()
export class TitleService {

  static ucFirst(string) {
    if (!string) {
      return string;
    }
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  static getTitle(title: string, noBase: boolean): string {
    let titleBase = '';
    if (!noBase) {
      titleBase = BASE_TITLE + SEPARATOR;
    }
    return titleBase + title;
  }

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
  ) {
  }

  autoSetTitle() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.activatedRoute),
      map(route => {
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      }),
      switchMap(route => route.data),
      map((data) => {
        if (data.title) {
          return TitleService.getTitle(data.title, data.titleNoBase);
        } else {
          // If not, we do a little magic on the url to create an approximation
          return this.router.url.split('/').reduce((acc, frag) => {
            if (acc && frag) {
              acc += SEPARATOR;
            }
            return acc + TitleService.ucFirst(frag);
          });
        }
      })
    )
    .subscribe((pathString) => this.setTitle(pathString, true));
  }

  setTitle(title: string, noBase: boolean = false): void {
    this.titleService.setTitle(TitleService.getTitle(title, noBase));
  }
}
