import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  // Services
  private router: Router = inject(Router);

  searchMovie(movie: string) {
    movie = movie.trim();

    if ( movie.length === 0 ) {
      return;
    }

    this.router.navigate(['/search', movie]);    
  }

}