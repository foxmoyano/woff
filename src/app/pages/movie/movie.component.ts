import { Component, inject, OnInit } from '@angular/core';
import { Cast, Crew, MovieResponse, MovieService } from '../../services/movie.service';
import { PosterPipe } from '../../pipes/poster.pipe';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-movie',
  imports: [
    CommonModule,
    PosterPipe
  ],
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.css'
})
export default class MovieComponent implements OnInit {
  public pelicula!: MovieResponse;
  public cast: Cast[] = [];
  public crew: Crew[] = [];
  public genres: String[] = [];
  public directors: String[] = [];
  public countries: String[] = [];

  // Services
  private location: Location = inject(Location);
  private router: Router = inject(Router);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private movieService: MovieService = inject(MovieService);
  
  ngOnInit(): void {
    const { id } = this.activatedRoute.snapshot.params;

    combineLatest([
      this.movieService.getMovieDetail( id )
      //this.movieService.getCast( id )
    ]).subscribe( ( [pelicula] ) => {      
      if ( !pelicula ) {
        this.router.navigateByUrl('/home');
        return;
      }

      this.pelicula = pelicula;
      //this.cast = creditsReponse.cast.filter( actor => actor.profile_path !== null );
      //this.directors = creditsReponse.crew.filter( crew => crew.job === 'Director').map(director => director.name);      
      this.genres = pelicula.genres.map( genre => genre.name );
      this.countries = pelicula.production_countries.map( country => country.name );
    });
  }

  onRegresar() {
    this.location.back();
  }

}