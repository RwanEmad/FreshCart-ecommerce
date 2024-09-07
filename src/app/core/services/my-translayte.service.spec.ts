import { TestBed } from '@angular/core/testing';

import { MyTranslayteService } from './my-translayte.service';

describe('MyTranslayteService', () => {
  let service: MyTranslayteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyTranslayteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
