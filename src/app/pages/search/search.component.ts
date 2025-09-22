import { Component, inject, OnInit, signal } from '@angular/core';
import { GalleryComponent } from "../../components/gallery/gallery.component";
import { Movie, MovieService } from '../../services/movie.service';
import { map, Observable, of, switchMap, tap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  imports: [
    GalleryComponent
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export default class SearchComponent implements OnInit {
  movies = signal<Movie[]>([]);

  // Services
  private activatedRoute = inject(ActivatedRoute);  
  private movieService = inject(MovieService);

  texto: string = '';

  ngOnInit(): void {
    this.getSearchResults();
  }

  private getSearchResults(): void {
    this.activatedRoute.params.pipe(
      map(params => params['text'] ?? ''), 
      tap(text => this.texto = text),
      switchMap((texto) =>
        texto ? this.movieService.search(texto) : of([])
      )
    ).subscribe({
      next: (movies: Movie[]) => {
        this.movies.set(movies);
      },
      error: (error: any) => {
        console.error('Error loading search results:', error);
        this.movies.set([]);
      }
    });
  }
  
}