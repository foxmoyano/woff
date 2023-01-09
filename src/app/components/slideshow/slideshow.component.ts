import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Movie } from 'src/app/interfaces/cartelera-response';
import SwiperCore, { Keyboard, Pagination, Navigation, Virtual, Swiper, SwiperOptions } from 'swiper';

SwiperCore.use([Keyboard, Pagination, Navigation, Virtual]);

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.css']
})
export class SlideshowComponent implements OnInit {
  @Input() movies: Movie[] = [];
  
  slides$ = new BehaviorSubject<string[]>(['']);
  
  constructor() {}

  ngOnInit(): void {
    this.slides$.next(
      Array.from({ length: 600 }).map((el, index) => `Slide ${index + 1}`)
    );
  }  


}
