import {Component, computed, input, resource} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-pokemon-card',
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './pokemon-card.html',
  styleUrl: './pokemon-card.css',
})
export class PokemonCard {
  pokemonUrl = input.required<string>();

  pokemonResource = resource({

    params: () => ({url: this.pokemonUrl()}),

    loader: async ({params}) => {
      return await fetch(this.pokemonUrl())
        .then(res => res.json())
    }
  })

  pokemonName = computed(() => {
    if (this.pokemonResource.hasValue()) {
      return capitalizeFirstLetter(this.pokemonResource.value().name);
    }
    return '';
  })

  pokemonImage = computed(() => {
    if (this.pokemonResource.hasValue()) {
      console.log(this.pokemonResource.value().sprites.front_default);
      return this.pokemonResource.value().sprites.front_default;
    }
  })
}
function capitalizeFirstLetter(val: string): string {
  return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}
