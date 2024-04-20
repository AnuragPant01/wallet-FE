import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletSetupComponent } from './wallet-setup.component';

describe('WalletSetupComponent', () => {
  let component: WalletSetupComponent;
  let fixture: ComponentFixture<WalletSetupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WalletSetupComponent]
    });
    fixture = TestBed.createComponent(WalletSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
