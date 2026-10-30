import { Routes } from '@angular/router';
import { MonitorList } from './components/monitor-list/monitor-list';

export const routes: Routes = [
  { path: '', component: MonitorList },
  { path: '**', redirectTo: '' },
];
