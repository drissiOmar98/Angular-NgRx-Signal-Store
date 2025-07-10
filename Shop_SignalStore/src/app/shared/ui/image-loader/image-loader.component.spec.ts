import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageLoaderComponent } from './image-loader.component';

describe('ImageLoaderComponent', () => {
  let component: ImageLoaderComponent;
  let fixture: ComponentFixture<ImageLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageLoaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
