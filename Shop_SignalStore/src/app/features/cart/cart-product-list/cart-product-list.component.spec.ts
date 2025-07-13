import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartProductListComponent } from './cart-product-list.component';

describe('CartProductListComponent', () => {
  let component: CartProductListComponent;
  let fixture: ComponentFixture<CartProductListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartProductListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
