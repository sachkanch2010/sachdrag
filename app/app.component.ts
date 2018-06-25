import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { PanGestureEventData } from "ui/gestures";
import { TouchGestureEventData } from "ui/gestures";
import { Image } from "ui/image";
import { GridLayout } from "ui/layouts/grid-layout";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {

  blocks: number[] = [0, 1, 2, 3, 4, 5, 6, 7];
  size: number = 50;
  halfSize: number = this.size/2;
  selected: boolean = false;
  colN: number;
  rowN: number;
  // Your TypeScript logic goes here
  @ViewChild("dragImage") dragImage: ElementRef;
  @ViewChild("container") container: ElementRef;

  dragImageItem: Image;
  prevDeltaX: number;
  prevDeltaY: number;
  isTrue: boolean;

  itemContainer: GridLayout;


  public ngOnInit() {
    this.itemContainer = <GridLayout>this.container.nativeElement;
    this.dragImageItem = <Image>this.dragImage.nativeElement;
    this.dragImageItem.translateX = 0;
    this.dragImageItem.translateY = 0;
    this.dragImageItem.scaleX = 0.5;
    this.dragImageItem.scaleY = 0.5;
  }

  onTouch(args: TouchGestureEventData, row, col){
    console.log(`Action is ${args.action} on row ${row} and col ${col}`);
    // console.log(this.isTrue);
    // this.isTrue[row][col] = true;
    // console.log(this.isTrue[row][col]);
  }

  onPan(args: PanGestureEventData) {
    var x,y: number;
    var cell: number[];

    if(this.size > 0){
      x = Math.floor((args.view.translateX + this.halfSize)/this.size);
      y = Math.floor((args.view.translateY + this.halfSize)/this.size);
      cell = [x, y];
    }
    
    // console.log("Pana: [" + args.deltaX + ", " + args.deltaY + "] state: " + args.state);
    // console.log("Pana: [" + args.view.translateX + ", " + args.view.translateY + "]");
    console.log(cell);
    if (args.state === 1) // down
    {
      this.selected = false;
      this.dragImageItem.scaleX = 1;
      this.dragImageItem.scaleY = 1;
      this.prevDeltaX = 0;
      this.prevDeltaY = 0;
      this.dragImageItem.translateX = 0;
      this.dragImageItem.translateY = 50;
    }
    else if (args.state === 2) // panning
    {
      this.selected = true;
      this.rowN = cell[1];
      this.colN = cell[0];

      this.dragImageItem.scaleX = 1;
      this.dragImageItem.scaleY = 1;

      this.dragImageItem.translateX += args.deltaX - this.prevDeltaX;
      this.dragImageItem.translateY += args.deltaY - this.prevDeltaY;
  
      if(this.dragImageItem.translateX < 0){
        this.dragImageItem.translateX = 0;
      }

      if(this.dragImageItem.translateX > 350){
        this.dragImageItem.translateX = 350;
      }     
      
      if(this.dragImageItem.translateY < 0){
        this.dragImageItem.translateY = 0;
      }

      if(this.dragImageItem.translateY > 350){
        this.dragImageItem.translateY = 350;
      }

      this.prevDeltaX = args.deltaX;
      this.prevDeltaY = args.deltaY;
    }
    else if (args.state === 3) // up
    {
      this.selected = false;
      this.dragImageItem.scaleX = 1;
      this.dragImageItem.scaleY = 1;
    }
  }
}
