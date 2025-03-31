import { Component, Input } from '@angular/core';
import { MovieResponse } from '../../../services/movie.service';
import { PosterPipe } from '../../../pipes/poster.pipe';
import { CommonModule } from '@angular/common';
import { StarRatingComponent } from '../../../components/star-rating/star-rating.component';

@Component({
  selector: 'app-movie-detail',
  imports: [
    CommonModule,
    PosterPipe,
    StarRatingComponent
  ],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css'
})
export class MovieDetailComponent {
  @Input() movie!: MovieResponse;
  @Input() genres: String[] = [];
  @Input() countries: String[] = [];

  onGoBack() {    
  }
  
}