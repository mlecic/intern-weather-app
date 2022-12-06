import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavCitiesComponent } from './fav-cities.component';

describe('FavCitiesComponent', () => {
  let component: FavCitiesComponent;
  let fixture: ComponentFixture<FavCitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavCitiesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavCitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
