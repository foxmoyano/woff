import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PipesModule } from '../pipes/pipes.module';
import { RouterModule } from '@angular/router';
import { RatingModule } from 'ng-starrating';
import { SwiperModule } from "swiper/angular";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { SlideshowComponent } from './slideshow/slideshow.component';
import { PeliculaPosterGridComponent } from './pelicula-poster-grid/pelicula-poster-grid.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CastSlideshowComponent } from './cast-slideshow/cast-slideshow.component';

@NgModule({
  declarations: [
    SlideshowComponent,
    PeliculaPosterGridComponent,
    NavbarComponent,
    CastSlideshowComponent
  ],
  exports: [
    NavbarComponent,
    SlideshowComponent,
    PeliculaPosterGridComponent,
    CastSlideshowComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    RatingModule,
    PipesModule,
    SwiperModule,
    FontAwesomeModule
  ]
})

export class ComponentsModule { }
