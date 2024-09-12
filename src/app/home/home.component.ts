import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  locations: any = [
    'BASEMENT OTS - 1',
    'BASEMENT OTS - 2',
    'BASEMENT OTS - 3',
    'BASEMENT OTS - 4',
  ];
  table: any = [
    ['Select All', 'Series 1', 'Series 2', 'Series 3', 'Series 4'],
    [
      'Basement 4',
      'TA-BS Tower Zone 1 BS OTS 4',
      'TA-BS Tower Zone 2 BS OTS 4',
      'TA-BS Tower Zone 3 BS OTS 4',
      'TA-BS Tower Zone 4 BS OTS 4',
    ],
    [
      'Basement 3',
      'TA-BS Tower Zone 1 BS OTS 3',
      'TA-BS Tower Zone 2 BS OTS 3',
      'TA-BS Tower Zone 3 BS OTS 3',
      'TA-BS Tower Zone 4 BS OTS 3',
    ],
    [
      'Basement 2',
      'TA-BS Tower Zone 1 BS OTS 2',
      'TA-BS Tower Zone 2 BS OTS 2',
      'TA-BS Tower Zone 3 BS OTS 2',
      'TA-BS Tower Zone 4 BS OTS 2',
    ],
    [
      'Basement 1',
      'TA-BS Tower Zone 1 BS OTS 1',
      'TA-BS Tower Zone 2 BS OTS 1',
      'TA-BS Tower Zone 3 BS OTS 1',
      'TA-BS Tower Zone 4 BS OTS 1',
    ],
  ];

  currId: any = 0;
  currLocation: string = this.locations[this.currId];

  map: Map<string, boolean> = new Map();
  mmap: Map<string, Map<string, boolean>> = new Map();

  ngOnInit(): void {
    this.mmap = new Map<string, Map<string, boolean>>();
    for (let p = 0; p < this.locations.length; p++) {
      this.map = new Map<string, boolean>();
      for (let i = 0; i < this.table.length; i++) {
        for (let j = 0; j < this.table.length; j++) {
          this.map.set(this.table[i][j], false);
        }
      }
      this.mmap.set(this.locations[p], this.map);
    }
  }

  constructor(private data: DataService, private route: Router) {}

  onClick(i: number): void {
    this.currId = i;
    this.currLocation = this.locations[this.currId];
  }

  onChecked(location: string): boolean {
    let oks = this.mmap.get(this.currLocation)?.get(location);
    return oks ? oks : false;
  }

  onCheckChange(i: number, j: number, event: any): void {
    const { checked } = event.target;
    const location = event.target.name;
    if (i === 0 && j === 0) {
      this.toggleAll(checked);
    } else if (i === 0) {
      for (let row = 0; row < this.table.length; row++) {
        this.mmap.get(this.currLocation)?.set(this.table[row][j], checked);
      }
    } else if (j === 0) {
      for (let col = 0; col < this.table.length; col++) {
        this.mmap.get(this.currLocation)?.set(this.table[i][col], checked);
      }
    } else {
      this.mmap.get(this.currLocation)?.set(location, checked);
    }
    this.data.reset();
  }

  onChange(): void {
    for (let i = 0; i < this.table.length; i++) {
      for (let j = i + 1; j < this.table.length; j++) {
        [this.table[i][j], this.table[j][i]] = [
          this.table[j][i],
          this.table[i][j],
        ];
      }
    }
    this.data.reset();
  }

  toggleAll(checked: boolean): void {
    for (let i = 0; i < this.table.length; i++) {
      for (let j = 0; j < this.table.length; j++) {
        this.mmap.get(this.currLocation)?.set(this.table[i][j], checked);
      }
    }
    this.data.reset();
  }
  onSaveData(): void {
    for (let p = 0; p < this.locations.length; p++) {
      for (let i = 0; i < this.table.length; i++) {
        for (let j = 0; j < this.table.length; j++) {
          if(this.mmap.get(this.locations[p])?.get(this.table[i][j]) && i!==0 && j!==0){
            this.data.onSave(this.locations[p],this.table[i][j]);
          }
        }
      }
    }
    if (this.data.getSize()) {
      this.route.navigate(['taggedlocations']);
    } else {
      alert('Please Select Some Locations To Be Tagged!');
    }
  }
}
