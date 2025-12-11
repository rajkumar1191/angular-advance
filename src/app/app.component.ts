// import { Component } from "@angular/core";
// import { CommonModule } from "@angular/common";
// import { AdvancedShowcaseComponent } from "./advanced-showcase.component";
// import { ChangeDetectionDemoComponent } from "./change-detection.component";
// import { AdvancedFormsComponent } from "./advanced-forms.component";

// @Component({
//   selector: "app-root",
//   standalone: true,
//   imports: [CommonModule, AdvancedShowcaseComponent, ChangeDetectionDemoComponent, AdvancedFormsComponent],
//   template: `
//     <div class="container">
//       <h1>Advanced Angular Core — Playground</h1>
//       <app-cd-demo></app-cd-demo>
//       <!-- Provide a projected template to showcase ContentChild usage -->
//       <app-advanced-showcase>
//         <ng-template #projected>
//           <div style="padding:10px; border:1px dashed #666;">
//             This is projected content from AppComponent (ng-template #projected)
//           </div>
//         </ng-template>
//       </app-advanced-showcase>

//       <app-advanced-forms></app-advanced-forms>
//     </div>
//   `,
// })
// export class AppComponent {}

import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  RouterOutlet,
  RouterLink,
  Router,
  RouteConfigLoadStart,
  RouteConfigLoadEnd,
  RouterLinkActive,
} from "@angular/router";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: "./app.component.html",
  styles: [
    `
      nav {
        display: flex;
        gap: 12px;
        background: #f3f4f6;
        padding: 10px;
        border-radius: 8px;
        margin-bottom: 16px;
      }
      a {
        text-decoration: none;
        color: #1f2937;
        font-weight: 500;
      }
      a.active {
        color: #2563eb;
      }
      .container {
        padding: 20px;
      }
    `,
  ],
})
export class AppComponent {
  loading;
  constructor(private router: Router) {
    router.events.subscribe((event) => {
      if (event instanceof RouteConfigLoadStart) this.loading = true;
      if (event instanceof RouteConfigLoadEnd) this.loading = false;
    });
  }
}
