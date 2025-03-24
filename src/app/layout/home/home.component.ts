import { Component, HostListener, inject, OnInit } from '@angular/core';
import { SlideshowComponent } from "../../components/slideshow/slideshow.component";
import { CommonModule } from '@angular/common';
import { Movie, MovieService } from '../../services/movie.service';
import { Observable, of } from 'rxjs';
import { DashboardComponent } from "../../components/dashboard/dashboard.component";

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    SlideshowComponent,
    DashboardComponent
],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export default class HomeComponent implements OnInit {
  //@HostListener('window:scroll', ['$event'])

  movies$: Observable<Movie[]> = of([]);    

  // Services
  private movieService: MovieService = inject(MovieService);

  ngOnInit(): void {
    this.movies$ = this.movieService.getCartelera();
  }  

  onScroll() {
    const pos = (document.documentElement.scrollTop || document.body.scrollTop) + 1300;
    const max = (document.documentElement.scrollHeight || document.body.scrollHeight);
    
    if (pos > max) {
      //if (this.movieService.cargando) return;

      /*this.movieService.getCartelera().subscribe(movies => {
        const currentMovies = this.moviesSubject.value;  // ✅ Obtiene el valor actual
        this.moviesSubject.next([...currentMovies, ...movies]);  // ✅ Actualiza correctamente
      });*/
    }
  }

}
