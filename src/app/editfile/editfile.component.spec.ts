import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditfileComponent } from './editfile.component';

describe('EditfileComponent', () => {
  let component: EditfileComponent;
  let fixture: ComponentFixture<EditfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
