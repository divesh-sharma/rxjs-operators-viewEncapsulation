import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-view-encapsulation-child',
  templateUrl: './view-encapsulation-child.component.html',
  styleUrls: ['./view-encapsulation-child.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class ViewEncapsulationChildComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
