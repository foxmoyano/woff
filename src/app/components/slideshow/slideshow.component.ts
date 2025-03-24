import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, Input, OnInit, signal } from '@angular/core';
// import function to register Swiper custom elements
import { register, SwiperContainer } from 'swiper/element/bundle';
import { Movie } from '../../services/movie.service';
import { SwiperOptions } from 'swiper/types';
import { Observable, of } from 'rxjs';
// register Swiper custom elements

register();@Component({
  selector: 'app-slideshow',
  standalone: true,
  imports: [
    CommonModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './slideshow.component.html',
  styleUrl: './slideshow.component.css'
})
export class SlideshowComponent implements OnInit{
  @Input() movies$: Observable<Movie[]> = of([]);
  swiperElement = signal<SwiperContainer | null>(null);

  ngOnInit(): void {
    const swiperElementConstructor = document.querySelector("swiper-container");
    const swiperOptions: SwiperOptions = {
      slidesPerView: 1,
      pagination: true,
      navigation: {
        enabled: true
      }
    }

    Object.assign(swiperElementConstructor!, swiperOptions);
    this.swiperElement.set(swiperElementConstructor as SwiperContainer);
    this.swiperElement()?.initialize();
  }
    
}
