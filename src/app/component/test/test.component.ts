import { Component } from '@angular/core';
import {MatPaginatorModule} from "@angular/material/paginator";

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [MatPaginatorModule],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})
export class TestComponent {

}
