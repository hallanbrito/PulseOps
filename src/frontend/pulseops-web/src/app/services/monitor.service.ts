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
  private readonly injectedBaseUrl = inject(API_BASE_URL, { optional: true });

  getBaseUrl(): string {
    // 1. Prioridade máxima: override dinâmico em runtime no browser (avaliado a cada chamada)
    if (typeof window !== 'undefined' && (window as any).__PULSEOPS_API_URL__) {
      return String((window as any).__PULSEOPS_API_URL__)
        .trim()
        .replace(/\/+$/, '');
    }
    // 2. Override explícito via Angular Dependency Injection (ex.: suítes de teste)
    if (
      this.injectedBaseUrl !== null &&
      this.injectedBaseUrl !== undefined &&
      this.injectedBaseUrl !== ''
    ) {
      return String(this.injectedBaseUrl).trim().replace(/\/+$/, '');
    }
    // 3. Padrão no Angular CLI com proxy de desenvolvimento (proxy.conf.json): caminho relativo /api
    return '';
  }

  getMonitors(): Observable<ServiceMonitor[]> {
    const base = this.getBaseUrl();
    const endpoint = base ? `${base}/api/monitors` : '/api/monitors';
    return this.http.get<ServiceMonitor[]>(endpoint);
  }
}
