import { Component, OnInit, Output } from '@angular/core';
import { CurrentWeatherService } from '../current-weather.service';
import { Favorite, FavoritesService } from '../favorites.service';

@Component({
  selector: 'app-fav-cities',
  templateUrl: './fav-cities.component.html',
  styleUrls: ['./fav-cities.component.scss']
})
export class FavCitiesComponent implements OnInit {

  @Output() allCities: Favorite[];

  constructor(private favoritesService: FavoritesService,
              private currentWeatherService: CurrentWeatherService) { }

  ngOnInit(): void {
    this.allCities = this.favoritesService.getFavorites();
    // listen to allFavourites (from fav.service) changes
    this.favoritesService.favorites$.subscribe(favorites => {
      this.allCities = favorites;
    });
  }

  onClickedFav(event: MouseEvent, cityName: string) {
    event.preventDefault();
    this.currentWeatherService.fetchCity(cityName);
  }

  onDeletedFav(event: MouseEvent, id: number) {
    event.preventDefault();
    this.favoritesService.deleteFavorite(id);
  }
}
