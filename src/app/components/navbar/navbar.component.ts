import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  faSearch = faSearch;

  constructor( private router: Router ) { }

  ngOnInit(): void {
  }

  buscarPelicula( texto: string ) {
    texto = texto.trim();

    if ( texto.length === 0 ) {
      return;
    }

    this.router.navigate(['/buscar', texto ]);
  }
  
}
