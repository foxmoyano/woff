import { Component, ChangeDetectionStrategy, Input, ContentChild, TemplateRef } from '@angular/core';
import { AsyncPipe, CommonModule, NgIf, NgTemplateOutlet } from '@angular/common';
import { LoadingService } from '../../services/loading.service';
import { Observable, tap } from 'rxjs';
import { RouteConfigLoadEnd, RouteConfigLoadStart, Router } from '@angular/router';

type Mode = 'spinner' | 'bar' | 'skeleton';
type Size = 'sm' | 'md' | 'lg';

@Component({
  selector: 'woff-loading-overlay',
  standalone: true,
  imports: [
    CommonModule,
    AsyncPipe, 
    NgIf, 
    NgTemplateOutlet
  ],
  templateUrl: './loading-overlay.component.html',
  styleUrl: './loading-overlay.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingOverlayComponent {
  loading$: Observable<boolean>;

  @Input()
  detectRouteTransitions = false;

  @ContentChild("loading")
  customLoadingIndicator: TemplateRef<any> | null = null;

  constructor(
  private loadingService: LoadingService,
  private router: Router) {
    this.loading$ = this.loadingService.loading$;
  }

  ngOnInit() {
    if (this.detectRouteTransitions) {
      this.router.events
        .pipe(
          tap((event) => {
            if (event instanceof RouteConfigLoadStart) {
              this.loadingService.loadingOn();
            } else if (event instanceof RouteConfigLoadEnd) {
              this.loadingService.loadingOff();
            }
          })
        )
        .subscribe();
    }
  }  
}