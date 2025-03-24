import { Component, inject, Input } from '@angular/core';
import { PosterPipe } from '../../pipes/poster.pipe';
import { Observable, of } from 'rxjs';
import { Movie } from '../../services/movie.service';
import { CommonModule } from '@angular/common';
import { YearOnlyPipe } from '../../pipes/only-year.pipe';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    PosterPipe,
    YearOnlyPipe
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'  
})
export class DashboardComponent {
  @Input() movies$: Observable<Movie[]> = of([]);

  // Services
  private router: Router = inject(Router);
  
  onMovieClick(movie: any) {
    this.router.navigate(['/movie', movie.id ]);    
  }

}