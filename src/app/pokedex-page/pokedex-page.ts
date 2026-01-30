import {Component, computed, model, resource, signal, WritableSignal} from '@angular/core';
import {PokemonCard} from '../components/pokemon-card/pokemon-card';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-pokedex-page',
  imports: [PokemonCard, FormsModule],
  templateUrl: './pokedex-page.html',
  styleUrl: './pokedex-page.css',
})
export class PokedexPage {

  filter= model<String>("");
  cardQt: WritableSignal<number> = signal(20);

  pokemonsResource = resource({
    loader: async () => {
      return fetch('https://pokeapi.co/api/v2/pokemon/?limit=20')
        .then(res => res.json())
    }
  })

  pokemons = computed(() => {
    const urls = [];
    if (this.pokemonsResource.hasValue()) {
      for (let i = 0; i < this.pokemonsResource.value().results.length; i++) {
        urls.push({id: i, url: this.pokemonsResource.value().results[i].url, name: this.pokemonsResource.value().results[i].name});
      }
    }
    return urls;

  })

  filteredPokemons = computed(() => {
    const filtered_pokemons = [];
    for (let pokemon of this.pokemons()) {
      if (pokemon.name.includes(this.filter())) {
        filtered_pokemons.push(pokemon);
      }
    }
    return filtered_pokemons;
  })
}
