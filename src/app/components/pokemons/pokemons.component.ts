import { Component, OnInit, Type } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { pokemonInterface } from 'src/interface/pokemonInterface';
import { Observable, tap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.css'],
})

export class PokemonsComponent {

  // la variable pokemons almacena los datos de la api (name, url) en formato json
  currentPage = 1;
  limit = 12;
  total = 0;
  links: any;
  pokemonName!: string;
  pokemonId!: number;
  pokemonURL!: string;
  searchResults: any[] = [];
  searchTerm!: string;
  searchTermurl!: string;
  filteredPokemones!: pokemonInterface[];
  pokemonesArray!: pokemonInterface[];
  pokemonNotFound!: boolean;
  notFoundMessage!: string;
  searchTermControl = new FormControl('', [Validators.pattern("[a-zA-Z]*")]);

  constructor(private pokeservice: PokemonService, private router: Router, private cdr: ChangeDetectorRef
    , private activatedRouter: ActivatedRoute) {
    this.activatedRouter.params.subscribe((params) => {
      const id = params['id'];
    });
  }

  ngOnInit() {
    this.getPokemons().subscribe();
  }

  //funcion que obtiene los pokemons de la api
  getPokemons(): Observable<pokemonInterface> {
    return this.pokeservice.getResources(this.limit, this.currentPage - 1).pipe(
      tap((res) => {
        this.pokemonesArray = res.results;
        this.filteredPokemones = res.results;
        this.pokemonName = res.results.name;
        this.pokemonURL = res.results.url;
        this.links = { next: res.next, previous: res.previous };
        this.total = res.count;
      })
    );
  }


  //funcion que retorna true si hay siguiente pagina 


  hasNext() {
    return (this.hasNext = () => this.links.next !== null);
    this.cdr.detectChanges();
  }

  //funcion que retorna true si hay pagina anterior
  hasPrevious() {
    return this.links.previous !== null;
    this.cdr.detectChanges();
  }

  //funcion que retrocede una pagina
  prevPage() {
    this.currentPage -= this.limit;
    this.getPokemons().subscribe();
  }

  //funcion que avanza una pagina
  nextPage() {
    this.currentPage += this.limit;
    this.getPokemons().subscribe();
  }

  //funcion que obtiene el id del pokemon para mostrar su detalle
  getId(id: string) {
    this.pokemonId = parseInt(id);
    this.router.navigate(['/pokedetail', this.pokemonId]);
  }

  search() {
    this.pokemonNotFound = false;
    if (!this.searchTerm || this.searchTerm.length < 3 || this.searchTermControl.invalid) {
      this.limit = 12;
      this.filteredPokemones = this.pokemonesArray;
    } else {
      this.pokeservice.searchPokemones(this.searchTerm, this.limit = 100, this.currentPage - 1).subscribe((res) => {
        this.searchResults = res.results.filter((pokemon: any) => {
          return pokemon.name.toLowerCase().includes(this.searchTerm.toLowerCase());
        });
        if (this.searchResults.length === 0 && this.searchTerm.length > 3) {
          this.pokemonNotFound = true;
          this.notFoundMessage = `No se encontraron resultados para ${this.searchTerm}`;
        }
        this.filteredPokemones = this.searchResults;
      });
    }
  }
}

