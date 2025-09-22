import { Component, inject, Input, signal, WritableSignal } from '@angular/core';
import { PosterPipe } from '../../pipes/poster.pipe';
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
  @Input() movies: WritableSignal<Movie[]> = signal<Movie[]>([]);

  first: number = 0;
  rows: number = 5;

  // Services
  private router = inject(Router);
  private movieService = inject(MovieService);

  onMovieClick(movie: any) {
    this.router.navigate(['/movie', movie.id ]);    
  }

  onPageChange(event: any) {    
    this.movieService.getMoviesByPage(event.page + 1).subscribe({
      next: (movies: Movie[]) => {
        this.movies.set(movies);
      },
      error: (error: any) => {
        console.error('Error loading movies by page:', error);
        this.movies.set([]);
      }
    });
  }

}