import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-selectcategory',
  templateUrl: './selectcategory.component.html',
  styleUrls: ['./selectcategory.component.css']
})
export class SelectcategoryComponent implements OnInit {
  values: any[] = []
  category: string

  constructor() { }

  subcategory: Array<any> = [
    { id: "3010", name: 'Mobile', value: ['Mobile'], route: "mobile" },
    { id: "3020", name: 'Tablet', value: ['Tablet'], route: "tablet" },
    { id: "3030", name: 'Laptop', value: ['Laptop'], route: "laptop" }
  ];
  vehicle: Array<any> = [
    { id: "1010", name: 'Bike', value: ['Bike'], route: "bike" },
    { id: "1020", name: 'Car', value: ['Car'], route: "car" },
    { id: "1030", name: 'Bus', value: ['Bus'], route: "bus" },
    { id: "1040", name: 'Truck', value: ['Truck'], route: "truck" },
    { id: "1050", name: 'Jeep', value: ['Jeep'], route: "jeep" }
  ];
  furnitures: Array<any> = [
    { id: "2010", name: 'Curtain', value: ['Curtain'], route: "curtain" },
    { id: "2020", name: 'Wood furniture', value: ['Wood furniture'], route: "woodfurnitre" },
    { id: "2030", name: 'Sofa set', value: ['Sofa set'], route: "sofaset" },
    { id: "2040", name: 'Blinds', value: ['Blinds'], route: "blind" },
  ];
  properties: Array<any> = [
    { id: "4010", name: 'For Sale', value: ['For Sale'], route: "forsale" },
    { id: "4020", name: 'For Rent', value: ['For Rent'], route: "forrent" }
  ];
  ngOnInit(): void {
  }
  displayValue() {
    this.category = "electronics"
    this.values = this.subcategory
    console.log('values',this.category, this.values)
  }
  vehicles() {
    this.values = this.vehicle
    this.category="vehicles"
    console.log('values', this.values)
  }
  furniture() {
    this.values = this.furnitures
    this.category="furniture"
    console.log('values', this.values)
  }
  property() {
    this.values = this.properties
    this.category="property"
    console.log('values', this.values)
  }
}