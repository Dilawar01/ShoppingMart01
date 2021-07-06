import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductRelatedCarouselComponent } from './product-related-carousel.component';

describe('ProductRelatedCarouselComponent', () => {
  let component: ProductRelatedCarouselComponent;
  let fixture: ComponentFixture<ProductRelatedCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductRelatedCarouselComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductRelatedCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
