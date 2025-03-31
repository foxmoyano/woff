import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of, switchMap, tap } from 'rxjs';
import { environment } from '../../environments/environment';

export interface CarteleraResponse {
  results:       Movie[];
  page:          number;
  total_results: number;
  dates:         Dates;
  total_pages:   number;
}

export interface Dates {
  maximum: Date;
  minimum: Date;
}

export interface Movie {
  popularity:        number;
  vote_count:        number;
  video:             boolean;
  poster_path:       string;
  id:                number;
  adult:             boolean;
  backdrop_path:     string;
  original_language: OriginalLanguage;
  original_title:    string;
  genre_ids:         number[];
  title:             string;
  vote_average:      number;
  overview:          string;
  release_date:      Date;
}

export enum OriginalLanguage {
  En = "en",
  Es = "es",
  Ko = "ko",
}

export interface MovieResponse {
  adult:                 boolean;
  backdrop_path:         string;
  belongs_to_collection: null;
  budget:                number;
  genres:                Genre[];
  homepage:              string;
  id:                    number;
  imdb_id:               string;
  original_language:     string;
  original_title:        string;
  overview:              string;
  popularity:            number;
  poster_path:           string;
  production_companies:  ProductionCompany[];
  production_countries:  ProductionCountry[];
  release_date:          Date;
  revenue:               number;
  runtime:               number;
  spoken_languages:      SpokenLanguage[];
  status:                string;
  tagline:               string;
  title:                 string;
  video:                 boolean;
  vote_average:          number;
  vote_count:            number;
}

export interface Genre {
  id:   number;
  name: string;
}

export interface ProductionCompany {
  id:             number;
  logo_path:      null | string;
  name:           string;
  origin_country: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name:       string;
}

export interface SpokenLanguage {
  iso_639_1: string;
  name:      string;
}

export interface CreditsReponse {
  id:   number;
  cast: Cast[];
  crew: Crew[];
}

export interface Cast {
  cast_id:      number;
  character:    string;
  credit_id:    string;
  gender:       number;
  id:           number;
  name:         string;
  order:        number;
  profile_path: string;
}

export interface Crew {
  credit_id:    string;
  department:   Department;
  gender:       number;
  id:           number;
  job:          string;
  name:         string;
  profile_path: null | string;
}

export enum Department {
  Art = "Art",
  Camera = "Camera",
  CostumeMakeUp = "Costume & Make-Up",
  Crew = "Crew",
  Directing = "Directing",
  Editing = "Editing",
  Lighting = "Lighting",
  Production = "Production",
  Sound = "Sound",
  VisualEffects = "Visual Effects",
  Writing = "Writing",
}

export interface VideoResponse {
  id: number;
  results: Video[];
}

export interface Video {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number,
  type: string;
  official: boolean;
  published_at: Date;
  id: string;
}

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private baseUrl: string = 'https://api.themoviedb.org/3';
  private carteleraPage = 1;
  public cargando: boolean = false;  

  private http:HttpClient = inject(HttpClient);

  get params() {
    return {
      api_key: `${environment.API_KEY}`,
      language: 'es-ES',
      page: 1
    }
  }  

  getBillboard():Observable<Movie[]> {
    if ( this.cargando ) {
      return of([]);
    }

    this.cargando = true;
    return this.http.get<CarteleraResponse>(`${this.baseUrl}/movie/now_playing`,{
      params: this.params
    }).pipe(
      map( (resp) => resp.results ),
      tap( () => {
        this.carteleraPage += 1;
        this.cargando = false;
      })
    );
  }

  search(texto: string):Observable<Movie[]> {
    const params = {...this.params, page: '1', query: texto };
    return this.http.get<CarteleraResponse>(`${ this.baseUrl }/search/movie`, {
      params
    }).pipe(
      map( resp => resp.results )
    )
  }

  getMovieDetail( id: string ) {
    return this.http.get<MovieResponse>(`${ this.baseUrl }/movie/${ id }`, {
      params: this.params
    }).pipe(
      catchError( err => of(null) )
    )
  }
  
  getMoviesByPage(page: number): Observable<Movie[]> {
    const params = {
      api_key: `${environment.API_KEY}`,
      language: 'es-ES',
      page: page     
    };
  
    return this.http.get<CarteleraResponse>(`${this.baseUrl}/movie/now_playing`, { params })
      .pipe(
        map(resp => resp.results)
      );
  }

  getVideos(id: number): Observable<Video[]> {
    const paramsEs = {
      api_key: environment.API_KEY,
      language: 'es-ES',
      page: 1
    };
  
    const paramsEn = {
      api_key: environment.API_KEY,
      language: 'en-EN',
      page: 1
    };

    return this.http.get<VideoResponse>(`${this.baseUrl}/movie/${id}/videos`, { params: paramsEs }).pipe(
      switchMap(resp => resp.results.length ? of(resp.results) : 
        this.http.get<VideoResponse>(`${this.baseUrl}/movie/${id}/videos`, { params: paramsEn }).pipe(
          map(resp => resp.results)
        )
      )
    );
  }

  getCasting(id: number):Observable<Cast[]> {
    const params = {
      api_key: `${environment.API_KEY}`,
      language: 'es-ES',
      page: 1
    };

    return this.http.get<CreditsReponse>(`${this.baseUrl}/movie/${id}/credits`, {params})
    .pipe(
      map(resp => resp.cast)
    );
  }  

}