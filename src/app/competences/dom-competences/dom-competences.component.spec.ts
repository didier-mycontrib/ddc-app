import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DomCompetencesComponent } from './dom-competences.component';

describe('DomCompetencesComponent', () => {
  let component: DomCompetencesComponent;
  let fixture: ComponentFixture<DomCompetencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DomCompetencesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DomCompetencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
