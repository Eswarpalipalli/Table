import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})
export class LocationsComponent implements OnInit{

  constructor(private data:DataService, private route:Router){}

  taggedLocations : string[] = [];

  ngOnInit(): void {
    this.taggedLocations = this.data.getData();
    if(!this.taggedLocations.length){
      this.route.navigate(['home']);
    }
  }
  
}
