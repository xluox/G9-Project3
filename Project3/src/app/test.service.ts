import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TestService {
  public  sharedValue  = 5;
  constructor() { }
}
