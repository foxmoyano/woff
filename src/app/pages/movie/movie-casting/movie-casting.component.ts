import { Component, inject, Input, OnInit, signal, computed } from '@angular/core';
import { Cast, MovieService } from '../../../services/movie.service';
import { CommonModule } from '@angular/common';
import { PosterPipe } from '../../../pipes/poster.pipe';
import { LoadingService } from '../../../services/loading.service';

@Component({
  selector: 'app-movie-casting',
  imports: [
    CommonModule,
    PosterPipe
  ],
  templateUrl: './movie-casting.component.html',
  styleUrl: './movie-casting.component.css'
})
export class MovieCastingComponent implements OnInit {
  @Input({ required: true }) movieId!: number;

  // Services
  private movieService = inject(MovieService);
  private loadingService = inject(LoadingService);

  casting = signal<Cast[]>([]);
  
  castingCount = computed(() => this.casting().length);
  hasMainCast = computed(() => this.casting().some(actor => actor.order <= 5));
  isLoading = signal<boolean>(false);

  ngOnInit(): void {
    this.getCasting();
  }

  private getCasting(): void {
    this.isLoading.set(true);
    this.loadingService.loadingOn();
    this.movieService.getCasting(this.movieId).subscribe({
      next: (cast) => {
        this.casting.set(cast);
        this.isLoading.set(false);
        this.loadingService.loadingOff();
      },
      error: (error) => {
        console.error('Error loading casting:', error);
        this.casting.set([]);
        this.isLoading.set(false);
        this.loadingService.loadingOff();
      }
    });
  }
}