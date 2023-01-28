import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PokemonService } from 'src/app/services/pokemon.service';
import { Router } from '@angular/router';
//import interface
import { pokemonInterface } from 'src/interface/pokemonInterface';
import { catchError, from, map, of, switchMap } from 'rxjs';
@Component({
  selector: 'app-poke-table',
  templateUrl: './poke-table.component.html',
  styleUrls: ['./poke-table.component.css'],
})
export class PokeTableComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'image'];
  data: any[] = [];
  datasource = new MatTableDataSource<any>(this.data);
  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;
  constructor(private pokeService: PokemonService, private router: Router) {}

  ngOnInit(): void {
    this.getPokemons(1);
  }

  totalPokemons = 100;
  pokemonsPerPage = 10;
  getPokemons(page = 1) {
    const range = from(Array.from({ length: 100 }, (_, i) => i + 1));
    range
      .pipe(
        switchMap((i) => this.pokeService.getPokemonsByPage(i)),
        map((res) => {
          const currentPage = res.page;
          const pokemons = res.results.map(
            (pokemon: { url: string; name: string }) => {
              const id = pokemon.url.split('/')[6];
              const position = (currentPage - 1) * 10 + Number(id);
              return {
                position: id,
                name: pokemon.name,
                image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`,
              };
            }
          );
          this.data.push(...pokemons);
          this.datasource = new MatTableDataSource<any>(this.data);
          this.datasource.paginator = this.paginator;
        }),
        catchError((err) => {
          console.log(err);
          return of(err);
        })
      )
      .subscribe();
  }
  changePage(event: PageEvent) {
    const currentPage = event.pageIndex + 1;
    this.getPokemons(currentPage);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.datasource.filter = filterValue.trim().toLowerCase();
    if (this.datasource.paginator) {
      this.datasource.paginator.firstPage();
    }
  }

  getRow(row: { position: number }) {
    this.router.navigateByUrl(`/pokedetail/${row.position}`);
  }

}
