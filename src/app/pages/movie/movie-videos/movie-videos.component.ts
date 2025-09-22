import { Component, inject, Input, OnChanges, OnInit, signal, SimpleChanges } from '@angular/core';
import { MovieResponse, MovieService, Video, VideoResponse } from '../../../services/movie.service';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser'; // Importar DomSanitizer
import { LoadingService } from '../../../services/loading.service';

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
  
  videos = signal<Video[]>([]);

  // Services
  private movieService: MovieService = inject(MovieService);
  private loadingService = inject(LoadingService);
  
  private sanitizer: DomSanitizer = inject(DomSanitizer);

  ngOnInit(): void {
    this.getVideos();
  }

  getUrlVideo(key: string) {
    const url = `https://www.youtube.com/embed/${key}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  private getVideos(): void {
    this.loadingService.loadingOn();
    this.movieService.getVideos(this.movieId).subscribe({
      next: ( videos ) => {
        this.videos.set(videos);
      },
      error: () => {
        this.loadingService.loadingOff();
      },
      complete: () => {
        this.loadingService.loadingOff();
      }
    });
  }    

}