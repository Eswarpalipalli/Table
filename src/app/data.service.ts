import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  taggedLocations : string[] = [];

  getData():any{
    return this.taggedLocations;
  }

  Reset():void{
    this.taggedLocations = [];
  }

  getSize():number{
    return this.taggedLocations.length;
  }

  onSave(location:any):void{
    this.taggedLocations.push(location);
  }
}
