import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServiceMonitor } from '../models/monitor.model';
import { API_BASE_URL } from '../config/api.config';

@Injectable({
  providedIn: 'root',
})
export class MonitorService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = inject(API_BASE_URL);

  getMonitors(): Observable<ServiceMonitor[]> {
    return this.http.get<ServiceMonitor[]>(`${this.baseUrl}/api/monitors`);
  }
}
