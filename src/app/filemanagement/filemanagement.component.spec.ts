import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileManagementComponent } from './filemanagement.component';

describe('TypographyComponent', () => {
  let component: FileManagementComponent;
  let fixture: ComponentFixture<FileManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
