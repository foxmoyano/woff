import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-navbar',
  imports: [
    InputGroupModule,
    InputGroupAddonModule,
    ButtonModule 
  ],
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