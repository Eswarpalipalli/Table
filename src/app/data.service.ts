import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService implements OnInit{

  constructor() {}
  taggedLocations : Map<string,string[]> = new Map();
  ngOnInit(): void {
      
  }
  
  locations: any = [
    'BASEMENT OTS - 1',
    'BASEMENT OTS - 2',
    'BASEMENT OTS - 3',
    'BASEMENT OTS - 4',
  ];

  getData():any{
    return Array.from(this.taggedLocations.entries());
  }

  reset():void{
    for (let i = 0; i < this.locations.length; i++) {
      let str : string[] = [];
      this.taggedLocations.set(this.locations[i],str);
    }
  }

  getSize():boolean{
    for(let i=0;i<this.locations.length;i++){
      if(this.taggedLocations.get(this.locations[i])?.length){
        return true;
      }
  }
  return false;
}

  onSave(location:string,taggedlocation:any):void{
    this.taggedLocations.get(location)?.push(taggedlocation);
  }
}
