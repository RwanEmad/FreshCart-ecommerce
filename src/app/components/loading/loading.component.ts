import { Component, inject } from '@angular/core';
import { NgxSpinnerComponent, NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [NgxSpinnerComponent],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss'
})
export class LoadingComponent {
  private readonly _NgxSpinnerService=inject(NgxSpinnerService)

}
