import { Component, inject, OnInit } from '@angular/core';
import { DashboardComponent } from "../../components/dashboard/dashboard.component";
import { Movie, MovieService } from '../../services/movie.service';
import { map, Observable, of, switchMap, tap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  imports: [DashboardComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export default class SearchComponent implements OnInit {
  movies$: Observable<Movie[]> = of([]);

  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);  
  private movieService: MovieService = inject(MovieService);

  texto: string = '';

  ngOnInit(): void {
    this.movies$ = this.activatedRoute.params.pipe(
      map(params => params['text'] ?? ''), 
      tap(text => this.texto = text),
      switchMap((texto) =>
        texto ? this.movieService.search(texto) : []
      )
    );
  }
  
}