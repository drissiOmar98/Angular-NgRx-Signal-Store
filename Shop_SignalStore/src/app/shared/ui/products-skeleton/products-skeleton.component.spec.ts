import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsSkeletonComponent } from './products-skeleton.component';

describe('ProductsSkeletonComponent', () => {
  let component: ProductsSkeletonComponent;
  let fixture: ComponentFixture<ProductsSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsSkeletonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
