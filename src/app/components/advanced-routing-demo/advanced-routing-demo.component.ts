import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouteConfigLoadStart, RouteConfigLoadEnd, NavigationEnd, RouterLink } from '@angular/router';
import { RxjsAdvancedComponent } from '../../rxjs-advanced.component';

@Component({
  selector: 'app-advanced-routing-demo',
  standalone: true,
  imports: [CommonModule, RxjsAdvancedComponent],
  templateUrl: './advanced-routing-demo.component.html'
})
export class AdvancedRoutingDemoComponent {
  loading = false;
  pageViews: string[] = [];

  constructor(private router: Router) {
    router.events.subscribe(event => {
      if (event instanceof RouteConfigLoadStart) this.loading = true;
      if (event instanceof RouteConfigLoadEnd) this.loading = false;

      if (event instanceof NavigationEnd) {
        console.log(event)
        this.pageViews.push(event.urlAfterRedirects);
        console.log(this.pageViews)
      }
    });
  }
}
