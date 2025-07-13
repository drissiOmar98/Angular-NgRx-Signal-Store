import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritesProductListComponent } from './favorites-product-list.component';

describe('FavoritesProductListComponent', () => {
  let component: FavoritesProductListComponent;
  let fixture: ComponentFixture<FavoritesProductListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavoritesProductListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavoritesProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
