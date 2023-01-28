import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from 'src/app/services/pokemon.service';
import { pokemonInterface } from 'src/interface/pokemonInterface';

@Component({
  selector: 'app-poke-detail',
  templateUrl: './poke-detail.component.html',
  styleUrls: ['./poke-detail.component.css'],
})
export class PokeDetailComponent {

  //variables para el pokemon seleccionado
  pokemon!: pokemonInterface;
  pokemonId!: number;
  pokemonImg!: string;
  pokemonName!: string;
  pokemonHeight!: number;
  pokemonWeight!: number;
  pokemonAbilities!: any[];
  pokemonStats!: any[];
  pokemonSpecies = [] as any;
  pokemontypes = [] as any;
  pokemonGenderRate = [] as any;
  pokemonGrowthRate!: string;
  pokemonEggGroup = [] as any;
  pokemonColor = [] as any;
  pokemonHabitat!: string;
  pokemonGeneration!: string;
  pokemonEvolutionChain = [] as any;
  pokemonEvolutionChain2!: string;
  pokemonEvolutionChain1!: string;
  pokemonEvolutionChain3!: string;

  //variables de colores para el metodo getColor
  attenuatedRed = 'rgba(252,108,109)';
  attenuatedGreen = 'rgba(73,208,176)';
  attenuatedBlue = 'rgba(118, 190, 254)';
  attentionWhite = 'rgba(153,153,153)';
  attentionYellow = 'rgba(255,215,111)';

  constructor(
    private activatedRouter: ActivatedRoute,
    private pokemonService: PokemonService
  ) {
    this.activatedRouter.params.subscribe((params) => {
      const id = params['id'];
      this.getPokemon(id);
      this.getPokemonSpecies(id);
      this.getPokemonTypes(id);
      this.getPokemonColor(id);
      this.getPokemonInvolution(id);
      this.getPokemonAbilities(id);
      this.getPokemonEggGroups(id);
    });
  }

  //metodo para obtener el pokemon con sus caracteristicas basicas
  getPokemon(id: number) {
    this.pokemonService.getPokemon(id).subscribe(
      (res) => {
        this.pokemon = res;
        this.pokemonId = res.id;
        this.pokemonName = res.name;
        this.pokemonHeight = res.height;
        this.pokemonWeight = res.weight;
        this.pokemonImg = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${res.id}.svg`;
        this.pokemonStats = res.stats.map((stat: any) => {
          return {
            base_stat: stat.base_stat,
            statname: stat.stat.name,
          };
        });
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getPokemonAbilities(id: number) {
    this.pokemonService.getPokemon(id).subscribe(
      (abilities) => {
        this.pokemonAbilities = abilities.abilities.map((ability: any) => {
          return ability.ability.name;
        });
      },
      (err) => {
        console.log(err);
      }
    );
  }

  //metodo para obtener el tipo del pokemon 
  getPokemonTypes(id: number) {
    this.pokemonService.getPokemon(id).subscribe(
      (types) => {
        let poketypes: string;
        types.types.forEach(element => {
          poketypes = element.type.name;
          this.pokemontypes.push(poketypes);
        });
      },
      (err) => {
        console.log(err);
      }
    );
  }

  //metodo para obtener la especie del pokemon, el porcentaje de genero, el grupo de huevos, el habitat y la generacion
  getPokemonSpecies(id: number) {
    this.pokemonService.getPokemonsSpecies(id).subscribe(
      (species) => {
        this.pokemonSpecies = species;
        this.pokemonGeneration = species.generation.name;
        this.pokemonGrowthRate = species.growth_rate.name;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  //metodo para obtener el egg group y el habitat del pokemon
  getPokemonEggGroups(id: number) {
    this.pokemonService.getPokemonsSpecies(id).subscribe(
      (species) => {
        let pokeeg: string;
        if (species.egg_groups === null) {
          pokeeg = "no tiene";
          this.pokemonEggGroup.push(pokeeg);
        } else {
          species.egg_groups.forEach(element => {
            pokeeg = element.name;
            this.pokemonEggGroup.push(pokeeg);
          });
        }
        if (species.habitat === null) {
          this.pokemonHabitat = "no tiene";
        } else {
          this.pokemonHabitat = species.habitat.name;
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  //metodo para obtener las evoluciones del pokemon 
  getPokemonInvolution(id: number) {
    this.pokemonService.getPokemonsSpecies(id).subscribe(
      (species) => {
        this.pokemonEvolutionChain = species.evolution_chain.url;
        let pokeevolutions: number;
        pokeevolutions = parseInt(species.evolution_chain.url.split('/')[species.evolution_chain.url.split('/').length - 2]);
        this.pokemonService.getPokemonEvolution(pokeevolutions).subscribe(
          (res) => {
            this.pokemonEvolutionChain2 = res.chain.evolves_to[0].species.name;
            this.pokemonEvolutionChain1 = res.chain.species.name;
            if (res.chain.evolves_to[0].evolves_to[0].species !== null || res.chain.evolves_to[0].evolves_to[0] !== undefined) {
              this.pokemonEvolutionChain3 = res.chain.evolves_to[0].evolves_to[0].species.name;
            } else {
              this.pokemonEvolutionChain3 = "";
            }
          }
        );
      }, (err) => {
        console.log(err);
      });
  }

  //metodo para obtener el color del pokemon y asignarle un color de fondo
  getPokemonColor(id: number) {
    this.pokemonService.getPokemonsSpecies(id).subscribe(
      (res) => {
        res.color.name;
        if (res.color.name === 'red') {
          this.pokemonColor = this.attenuatedRed;
        } else if (res.color.name === 'green') {
          this.pokemonColor = this.attenuatedGreen;
        } else if (res.color.name === 'blue') {
          this.pokemonColor = this.attenuatedBlue;
        } else if (res.color.name === 'white') {
          this.pokemonColor = this.attentionWhite;
        } else if (res.color.name === 'yellow') {
          this.pokemonColor = this.attentionYellow;
        } else { this.pokemonColor = res.color.name; }
      },
      (err) => {
        console.log(err);
      });
  }

  goBack() {
    window.history.back();
  }

}
