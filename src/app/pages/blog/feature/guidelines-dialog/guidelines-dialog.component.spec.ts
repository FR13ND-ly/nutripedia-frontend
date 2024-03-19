import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuidelinesDialogComponent } from './guidelines-dialog.component';

describe('GuidelinesDialogComponent', () => {
  let component: GuidelinesDialogComponent;
  let fixture: ComponentFixture<GuidelinesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuidelinesDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GuidelinesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
