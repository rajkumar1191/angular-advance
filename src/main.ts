import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter, withPreloading } from '@angular/router';
import { routes } from './app/app.routes';
import { CustomPreloader } from './app/preloading/custom-preloader';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes, withPreloading(CustomPreloader))
  ]
})
  .catch(err => console.error(err));
