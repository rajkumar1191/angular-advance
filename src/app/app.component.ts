import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AdvancedShowcaseComponent } from "./advanced-showcase.component";
import { ChangeDetectionDemoComponent } from "./change-detection.component";
import { AdvancedFormsComponent } from "./advanced-forms.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [CommonModule, AdvancedShowcaseComponent, ChangeDetectionDemoComponent, AdvancedFormsComponent],
  template: `
    <div class="container">
      <h1>Advanced Angular Core — Playground</h1>
      <app-cd-demo></app-cd-demo>
      <!-- Provide a projected template to showcase ContentChild usage -->
      <app-advanced-showcase>
        <ng-template #projected>
          <div style="padding:10px; border:1px dashed #666;">
            This is projected content from AppComponent (ng-template #projected)
          </div>
        </ng-template>
      </app-advanced-showcase>

      <app-advanced-forms></app-advanced-forms>
    </div>
  `,
})
export class AppComponent {}
