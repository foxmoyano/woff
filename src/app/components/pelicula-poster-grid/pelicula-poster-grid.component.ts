import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from 'src/app/interfaces/cartelera-response';

@Component({
  selector: 'app-pelicula-poster-grid',
  templateUrl: './pelicula-poster-grid.component.html',
  styleUrls: ['./pelicula-poster-grid.component.css']
})
export class PeliculaPosterGridComponent implements OnInit {
  @Input() movies: Movie[] = [];

  constructor( private router: Router ) { }

  ngOnInit(): void {
    console.log(this.movies);
  }

  onMovieClick( movie: Movie ) {
    console.log(movie);
    this.router.navigate(['/pelicula', movie.id ]);
  }
}
