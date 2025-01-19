import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportRoutingModule } from './report-routing.module';
import { ReportComponent } from './report.component';
import { CoreModule } from '../../core/core.module';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DayViewComponent } from './components/day-view/day-view.component';

@NgModule({
  declarations: [ReportComponent, DayViewComponent],
  imports: [
    CommonModule,
    ReportRoutingModule,
    CoreModule,
    FormsModule,
    MatDatepickerModule,
  ],
})
export class ReportModule {}
