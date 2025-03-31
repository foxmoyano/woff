import { Component, inject, Input } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Cast, MovieService } from '../../../services/movie.service';
import { CommonModule } from '@angular/common';
import { PosterPipe } from '../../../pipes/poster.pipe';

@Component({
  selector: 'app-movie-casting',
  imports: [
    CommonModule,
    PosterPipe
  ],
  templateUrl: './movie-casting.component.html',
  styleUrl: './movie-casting.component.css'
})
export class MovieCastingComponent {
  @Input({ required: true }) movieId!: number;

  casting$: Observable<Cast[]> = of([]);

  // Services
  private movieService: MovieService = inject(MovieService);  

  ngOnInit(): void {
    this.casting$ = this.movieService.getCasting(this.movieId);
  }
  
}