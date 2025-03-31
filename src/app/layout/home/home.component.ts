import { Component, inject, OnInit } from '@angular/core';
import { SlideshowComponent } from "../../components/slideshow/slideshow.component";
import { CommonModule } from '@angular/common';
import { Movie, MovieService } from '../../services/movie.service';
import { Observable, of } from 'rxjs';
import { GalleryComponent } from "../../components/gallery/gallery.component";

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    SlideshowComponent,
    GalleryComponent
],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export default class HomeComponent implements OnInit {
  movies$: Observable<Movie[]> = of([]);

  // Services
  private movieService: MovieService = inject(MovieService);

  ngOnInit(): void {
    this.movies$ = this.movieService.getBillboard();
  }

}