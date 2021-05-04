import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteGenerationComponent } from './quote-generation.component';

describe('QuoteGenerationComponent', () => {
  let component: QuoteGenerationComponent;
  let fixture: ComponentFixture<QuoteGenerationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuoteGenerationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteGenerationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
