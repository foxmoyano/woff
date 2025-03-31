import { Component, inject, Input } from '@angular/core';
import { PosterPipe } from '../../pipes/poster.pipe';
import { Observable, of } from 'rxjs';
import { Movie, MovieService } from '../../services/movie.service';
import { CommonModule } from '@angular/common';
import { YearOnlyPipe } from '../../pipes/only-year.pipe';
import { Router } from '@angular/router';
import { PaginatorModule } from 'primeng/paginator';

@Component({
  selector: 'app-gallery',
  imports: [
    CommonModule,
    PaginatorModule,
    PosterPipe,
    YearOnlyPipe
  ],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css'  
})
export class GalleryComponent {
  @Input() movies$: Observable<Movie[]> = of([]);

  first: number = 0;
  rows: number = 5;

  // Services
  private router: Router = inject(Router);
  private movieService: MovieService = inject(MovieService);

  onMovieClick(movie: any) {
    this.router.navigate(['/movie', movie.id ]);    
  }

  onPageChange(event: any) {    
    this.movies$ = this.movieService.getMoviesByPage(event.page + 1);
  }

}