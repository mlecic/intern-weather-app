import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { FAVORITES } from './utils/constants';

export interface Favorite {
  id: number;
  cityName: string;
}

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  favorites$ = new Subject<Favorite[]>();

  constructor() { }

  public addFavorite(id: number, cityName: string): void {
    let allFavorites = this.getFavorites() || [];
    allFavorites.push({ id, cityName });
    window.localStorage.setItem(FAVORITES, JSON.stringify(allFavorites));
    this.favorites$.next(allFavorites);
  }

  public getFavorites() {
    const favorites = window.localStorage.getItem(FAVORITES);
    return favorites ? JSON.parse(favorites) : [];
  }

  public deleteFavorite(id: number) {
    // Get all except the targeted one, put it in the new Obj
    const newAllFavs =  this.getFavorites().filter((element: any) => element.id !== id);
    // Set filtered Obj as new, shoot new Obsevrable
    window.localStorage.setItem(FAVORITES, JSON.stringify(newAllFavs));
    this.favorites$.next(newAllFavs);    
  }
  
  public checkCity(cityID: number, favorites?: Favorite[]): boolean {
    const favs = !!favorites ? favorites :  this.getFavorites();    
    return favs.filter((element: any) => element.id === cityID).length; 
  }

}
