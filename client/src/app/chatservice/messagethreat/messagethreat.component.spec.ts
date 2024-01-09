import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagethreatComponent } from './messagethreat.component';

describe('MessagethreatComponent', () => {
  let component: MessagethreatComponent;
  let fixture: ComponentFixture<MessagethreatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessagethreatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessagethreatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
