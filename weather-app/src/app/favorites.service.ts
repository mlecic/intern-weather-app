import { Injectable } from '@angular/core';
import { FAVORITES } from './utils/constants';
import { Subject } from 'rxjs';

export interface Favorite {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  constructor() { }

  public addFavorite(id: number, cityName: string): void {
    let allFavorites = this.getFavorites() || [];
    allFavorites.push({ id, cityName });
    window.localStorage.setItem(FAVORITES, JSON.stringify(allFavorites));
  }

  public getFavorites() {
    const favorites = window.localStorage.getItem(FAVORITES);
    return favorites ? JSON.parse(favorites) : [];
  }
}
