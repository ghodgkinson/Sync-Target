import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutageReportComponent } from './outage.report.component';

describe('Outage.ReportComponent', () => {
  let component: OutageReportComponent;
  let fixture: ComponentFixture<OutageReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutageReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutageReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
