import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HeroSearchComponent } from './hero-search.component';

describe('HeroSearchComponent', () => {
  let component: HeroSearchComponent;
  let fixture: ComponentFixture<HeroSearchComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HeroSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
