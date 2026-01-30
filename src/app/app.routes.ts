import { Routes } from '@angular/router';
import {HomePage} from './home-page/home-page';
import {PokedexPage} from './pokedex-page/pokedex-page';

export const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'pokedex',
    component: PokedexPage,
  }
];
