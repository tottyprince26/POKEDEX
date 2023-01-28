import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { evironments } from 'src/environments/environments';
import { pokemonInterface } from 'src/interface/pokemonInterface';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class PokemonService { 
  limit = 20;
  BASEURL = evironments.baseUrl;
  pokemonsPerPage = 100;
  
  constructor(private http: HttpClient) { }

  getPokemon(index: number){
    return this.http.get<pokemonInterface>(`${this.BASEURL}/pokemon/${index}`);
  }
  getResources(limit = 20, offset = 0) {
    return this.http.get<pokemonInterface>(`${this.BASEURL}/pokemon?limit=${limit}&offset=${offset}`);
  }
  searchPokemones(searchTerm: string, limit: number, offset: number) {
    return this.http.get<pokemonInterface>(`${this.BASEURL}/pokemon?limit=${limit}&offset=${offset}&search=${searchTerm}`);
  }
  getPokemonsByPage(page: number): Observable<any> {
    const params = new HttpParams().set('page', page.toString()).set('limit', this.pokemonsPerPage.toString());
    return this.http.get<pokemonInterface>(`https://pokeapi.co/api/v2/pokemon`,{params});
  }
  getPokemonsTypes(index: number){
    return this.http.get<pokemonInterface>(`${this.BASEURL}/type/${index}`);
  }
  getPokemonsAbilities(index: number){
    return this.http.get<pokemonInterface>(`${this.BASEURL}/ability/${index}`);
  }
  
  getPokemonsSpecies(index: number){
    return this.http.get<pokemonInterface>(`${this.BASEURL}/pokemon-species/${index}`);
  }

getPokemonColor(index: number){
  return this.http.get<pokemonInterface>(`${this.BASEURL}/pokemon-color/${index}`)
}

handleError(error: HttpErrorResponse) {
  if (error.error instanceof ErrorEvent) {
    console.error('An error occurred:', error.error.message);
  } else {
    console.error(
      `Backend returned code ${error.status}, ` +
      `body was: ${error.error}`);
  }
  return throwError(
    'Something bad happened; please try again later.');
};

getPokemonEvolution(index: number){
  return this.http.get<pokemonInterface>(`${this.BASEURL}/evolution-chain/${index}`)
}

}
