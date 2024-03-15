import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPageComponent } from './edit-page.component';

describe('EditPageComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({
    declarations: [EditPageComponent]
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(EditPageComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'template-driven-form'`, () => {
    const fixture = TestBed.createComponent(EditPageComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('template-driven-form');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(EditPageComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain('template-driven-form app is running!');
  });
});



