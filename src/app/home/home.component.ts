import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{ 
  locations : any = ["BASEMENT OTS - 1","BASEMENT OTS - 2","BASEMENT OTS - 3","BASEMENT OTS - 4"]
  table:any = [
  ["Select All","Series 1","Series 2","Series 3","Series 4"],
  ["Basement 4","TA-BS Tower Zone 1 BS OTS 4","TA-BS Tower Zone 2 BS OTS 4","TA-BS Tower Zone 3 BS OTS 4","TA-BS Tower Zone 4 BS OTS 4"],
  ["Basement 3","TA-BS Tower Zone 1 BS OTS 3","TA-BS Tower Zone 2 BS OTS 3","TA-BS Tower Zone 3 BS OTS 3","TA-BS Tower Zone 4 BS OTS 3"],
  ["Basement 2","TA-BS Tower Zone 1 BS OTS 2","TA-BS Tower Zone 2 BS OTS 2","TA-BS Tower Zone 3 BS OTS 2","TA-BS Tower Zone 4 BS OTS 2"],
  ["Basement 1","TA-BS Tower Zone 1 BS OTS 1","TA-BS Tower Zone 2 BS OTS 1","TA-BS Tower Zone 3 BS OTS 1","TA-BS Tower Zone 4 BS OTS 1"]
  ];

  // rowCheck : boolean[][] = [];
  // colCheck : boolean[] = [];
  currId : any = 0;
  currLocation : string = this.locations[this.currId];

  map : Map<string, boolean> = new Map();
  mmap : Map<string,Map<string,boolean>> = new Map();

  ngOnInit(): void {
    // this.rowCheck = this.table.map(()=> new Array(this.table[0].length).fill(false));
    // this.colCheck = new Array(this.table[0].length).fill(false);
    this.map = new Map<string,boolean>();
    this.mmap = new Map<string,Map<string,boolean>>();
    for(let i = 0; i < this.table.length; i++){
      for(let j = 0; j < this.table.length; j++){
        this.map.set(this.table[i][j],false);
      }
    }
    for(let i = 0; i < this.locations.length; i++){
      this.mmap.set(this.locations[i],this.map);
    }
  } 

  constructor(private data:DataService, private route:Router){}

  onClick(i:number):void{
    this.currId = i;
    this.currLocation = this.locations[this.currId];
  }
  
  onChecked(location:string):boolean{
    //  return this.rowCheck[i][j];
    // let ok = this.map.get(location);
    let oks = this.mmap.get(this.currLocation)?.get(location);
    return oks?oks:false;
  }

  onCheckChange(i:number,j:number,event:any):void{
    const {checked} = event.target;
    const location = event.target.name;
    if(i === 0 && j === 0){
      this.toggleAll(checked);
    } else if(i === 0){
      // for (let row = 0; row < this.table.length; row++) {
      //     this.rowCheck[row][j] = checked;
      // }
      // this.colCheck[j] = checked;
      for(let row = 0; row < this.table.length; row++){
        // this.map.set(this.table[row][j],checked);
        this.mmap.get(this.currLocation)?.set(this.table[row][j],checked);
      }
    } else if(j === 0){
      // this.rowCheck[i] = this.rowCheck[i].map(()=>checked);
      for(let col = 0; col < this.table.length; col++){
        // this.map.set(this.table[i][col],checked);
        this.mmap.get(this.currLocation)?.set(this.table[i][col],checked);
      }
    } else{
      // this.rowCheck[i][j] = checked;
      // this.map.set(location,checked);
      this.mmap.get(this.currLocation)?.set(location,checked);
    }
    this.data.Reset();
  }

  onChange():void{
    for (let i = 0; i < this.table.length; i++) {
        for(let j = i+1; j < this.table.length; j++){
          [this.table[i][j],this.table[j][i]] = [this.table[j][i],this.table[i][j]];
        }
    }
    // for (let i = 0; i < this.rowCheck.length; i++) {
    //   for(let j = i+1; j < this.rowCheck.length; j++){
    //     [this.rowCheck[i][j],this.rowCheck[j][i]] = [this.rowCheck[j][i],this.rowCheck[i][j]];
    //   }
    // }
    this.data.Reset();
  }

  toggleAll(checked:boolean):void{
    // for (let i = 0; i < this.table.length; i++) {
    //   this.rowCheck[i] = this.rowCheck[i].map(()=>checked);
    // }
    for (let i = 0; i < this.table.length; i++) {
      for(let j = 0; j < this.table.length; j++) {
        // this.map.set(this.table[i][j],checked);
        // this.mmap.get(this.currLocation)?.set(this.table[i][j],checked);
      }
    }
    this.data.Reset();
  }
  onSaveData():void{
    // for(let i = 0; i < this.rowCheck.length; i++){
    //   for(let j = 0; j < this.rowCheck[0].length; j++){
    //     if (this.rowCheck[i][j] && i!==0 && j!==0) {
    //       this.data.onSave(this.table[i][j]);
    //     }
    //   }
    // }
    for (let i = 0; i < this.table.length; i++) {
      for(let j = 0; j < this.table.length; j++) {
        if (this.map.get(this.table[i][j]) && i!==0 && j!==0){
          this.data.onSave(this.table[i][j]);
        }
      }
    }
    if(this.data.getSize()){
      this.route.navigate(['taggedlocations']);
    }else{
      alert("Please Select Some Locations To Be Tagged!");
    }
  }
}
