import { Component, Input, inject } from '@angular/core';
import { Location } from '@angular/common';
import { MovieResponse } from '../../../services/movie.service';
import { PosterPipe } from '../../../pipes/poster.pipe';
import { CommonModule } from '@angular/common';
import { StarRatingComponent } from '../../../components/star-rating/star-rating.component';
import { COUNTRY_MAP } from '../../../utils/country-map';

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
  @Input() genres: string[] = [];
  @Input() countries: string[] = [];

  private location = inject(Location);

  onGoBack() {
    this.location.back();
  }

  // Getter para traducir el arreglo
  get translatedCountries(): string[] {
    return this.countries.map(c => COUNTRY_MAP[c] ?? c);
  }  
  
}