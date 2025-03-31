import { Component, Input, signal, WritableSignal } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  imports: [],
  templateUrl: './star-rating.component.html',
  styleUrl: './star-rating.component.css'
})
export class StarRatingComponent {
  @Input() maxStars: number = 10;  // Número total de estrellas
  @Input() rating: number = 0;    // Calificación actual

  // Signal para manejar las estrellas de manera reactiva
  //stars: WritableSignal<number[]> = signal([...Array(this.maxStars).keys()]);

  // Crea un array de estrellas donde cada una tiene un valor de 0 a maxStars
  get stars(): boolean[] {
    return Array(this.maxStars)
      .fill(false)
      .map((_, index) => index < this.rating);
  }

  setRating(value: number) {
    this.rating = value;
  }  

}