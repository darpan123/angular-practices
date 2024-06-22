import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatTableCopyToClipboardComponent } from './mat-table-copy-to-clipboard.component';

describe('MatTableCopyToClipboardComponent', () => {
  let component: MatTableCopyToClipboardComponent;
  let fixture: ComponentFixture<MatTableCopyToClipboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MatTableCopyToClipboardComponent]
    });
    fixture = TestBed.createComponent(MatTableCopyToClipboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
