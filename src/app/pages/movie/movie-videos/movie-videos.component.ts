import { Component, inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MovieResponse, MovieService, Video, VideoResponse } from '../../../services/movie.service';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser'; // Importar DomSanitizer

@Component({
  selector: 'app-movie-videos',
  imports: [
    CommonModule
  ],
  templateUrl: './movie-videos.component.html',
  styleUrl: './movie-videos.component.css'
})
export class MovieVideosComponent implements OnInit {
  @Input({ required: true }) movieId!: number;
  
  videos$: Observable<Video[]> = of([]);

  // Services
  private movieService: MovieService = inject(MovieService);
  private sanitizer: DomSanitizer = inject(DomSanitizer);

  ngOnInit(): void {
    this.videos$ = this.movieService.getVideos(this.movieId);
  }

  getUrlVideo(key: string) {
    const url = `https://www.youtube.com/embed/${key}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}