import { Injectable } from '@angular/core';
import { withCache } from '@ngneat/cashew';

@Injectable({
  providedIn: 'root'
})

export class CoreService {

  constructor() { }

  private options = {
    context: withCache({
        version: 'v1',
        key: 'omelet'
      })
  };
}
