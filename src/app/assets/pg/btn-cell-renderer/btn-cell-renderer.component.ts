
import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular'; 

@Component({
  selector: 'app-button-renderer',

  template: `
  
    <button type="button" class="btn text-primary p-0 mr-4 border-1" (click)="onClick($event)">
    <i class="fas fa-edit"></i>
    </button>

    <button type="button" class="btn text-danger p-0 border-1" (click)="onClick($event)">
    <i class="fas fa-trash-alt"></i>
  </button>
    `
})

export class ButtonRendererComponent implements ICellRendererAngularComp {

  params;
  label: string;

  agInit(params): void {
    this.params = params;
    this.label = this.params.label || null;
  }

  refresh(params?: any): boolean {
    return true;
  }

  onClick($event) {
    if ($event.target.className == 'fas fa-edit') {
      $event.action = "edit";
    } else {
      $event.action = "delete";

    }
    if (this.params.onClick instanceof Function) {
      // put anything into params u want pass into parents component

      const params = {
        event: $event,
        rowData: this.params.node.data
        // ...something
      }
      this.params.onClick(params);

    }
  }
}