import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { TableListComponent } from '../../table-list/table-list.component';

import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatTooltipModule,
} from '@angular/material';
import { ClassroomComponent } from '../../classroom/classroom.component';
import { AnalysisComponent } from '../../analysis/analysis.component';
import { GraphComponent } from '../../visuals/graph/graph.component';
import { SHARED_VISUALS } from '../../visuals/shared';
import { D3_DIRECTIVES, D3Service } from '../../d3';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    MatButtonModule,
    MatRippleModule,
    MatInputModule,
    MatTooltipModule,
    HttpClientModule
  ],
  declarations: [
    DashboardComponent,
    AnalysisComponent,
    TableListComponent,
    ClassroomComponent,
    AnalysisComponent,
    GraphComponent,
    ...SHARED_VISUALS,
    ...D3_DIRECTIVES
  ],
  providers: [D3Service]
})

export class AdminLayoutModule {}
