import { InjectionToken } from '@angular/core';

export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL', {
  providedIn: 'root',
  factory: () => {
    // Permite override em tempo de execução sem recompilação via window.__PULSEOPS_API_URL__ (ex.: console DevTools ou script externo)
    if (typeof window !== 'undefined' && (window as any).__PULSEOPS_API_URL__) {
      return (window as any).__PULSEOPS_API_URL__.replace(/\/+$/, '');
    }
    // No servidor de desenvolvimento Angular, o proxy reencaminha '/api' para o backend configurado (proxy.conf.json)
    return '';
  },
});
