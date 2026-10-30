import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { MonitorService } from './monitor.service';
import { API_BASE_URL } from '../config/api.config';
import { ServiceMonitor } from '../models/monitor.model';

describe('MonitorService', () => {
  let service: MonitorService;
  let httpTesting: HttpTestingController;
  const testBaseUrl = 'http://localhost:5000';

  const mockMonitors: ServiceMonitor[] = [
    {
      id: '11111111-1111-1111-1111-111111111111',
      name: 'API Principal',
      url: 'https://api.example.com/health',
      intervalSeconds: 60,
      enabled: true,
      createdAtUtc: '2026-10-30T10:00:00Z',
    },
    {
      id: '22222222-2222-2222-2222-222222222222',
      name: 'Portal Web',
      url: 'https://web.example.com',
      intervalSeconds: 120,
      enabled: false,
      createdAtUtc: '2026-10-30T10:05:00Z',
    },
  ];

  describe('com baseUrl explicitamente fornecida via DI', () => {
    beforeEach(() => {
      delete (window as any).__PULSEOPS_API_URL__;

      TestBed.configureTestingModule({
        providers: [
          provideHttpClient(),
          provideHttpClientTesting(),
          { provide: API_BASE_URL, useValue: testBaseUrl },
        ],
      });

      service = TestBed.inject(MonitorService);
      httpTesting = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
      delete (window as any).__PULSEOPS_API_URL__;
      httpTesting.verify();
    });

    it('deve ser instanciado corretamente', () => {
      expect(service).toBeTruthy();
    });

    it('deve requisitar GET {baseUrl}/api/monitors e retornar lista de monitores', () => {
      let result: ServiceMonitor[] | undefined;
      service.getMonitors().subscribe((data) => {
        result = data;
      });

      const req = httpTesting.expectOne(`${testBaseUrl}/api/monitors`);
      expect(req.request.method).toBe('GET');
      req.flush(mockMonitors);

      expect(result).toEqual(mockMonitors);
      expect(result?.length).toBe(2);
    });

    it('deve retornar lista vazia quando a API responder com array vazio', () => {
      let result: ServiceMonitor[] | undefined;
      service.getMonitors().subscribe((data) => {
        result = data;
      });

      const req = httpTesting.expectOne(`${testBaseUrl}/api/monitors`);
      expect(req.request.method).toBe('GET');
      req.flush([]);

      expect(result).toEqual([]);
    });

    it('deve propagar erro quando a chamada HTTP falhar', () => {
      let errorResponse: any;
      service.getMonitors().subscribe({
        next: () => {
          throw new Error('Não deveria ter sucedido');
        },
        error: (err) => {
          errorResponse = err;
        },
      });

      const req = httpTesting.expectOne(`${testBaseUrl}/api/monitors`);
      expect(req.request.method).toBe('GET');
      req.flush('Falha interna no servidor', {
        status: 500,
        statusText: 'Internal Server Error',
      });

      expect(errorResponse).toBeTruthy();
      expect(errorResponse.status).toBe(500);
    });
  });

  describe('com configuração padrão (proxy relativo)', () => {
    beforeEach(() => {
      delete (window as any).__PULSEOPS_API_URL__;

      TestBed.configureTestingModule({
        providers: [provideHttpClient(), provideHttpClientTesting()],
      });

      service = TestBed.inject(MonitorService);
      httpTesting = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
      delete (window as any).__PULSEOPS_API_URL__;
      httpTesting.verify();
    });

    it('deve requisitar caminho relativo /api/monitors quando baseUrl for vazia', () => {
      let result: ServiceMonitor[] | undefined;
      service.getMonitors().subscribe((data) => {
        result = data;
      });

      const req = httpTesting.expectOne('/api/monitors');
      expect(req.request.method).toBe('GET');
      req.flush(mockMonitors);

      expect(result).toEqual(mockMonitors);
    });
  });

  describe('com override dinâmico em runtime via window.__PULSEOPS_API_URL__ (R2-01)', () => {
    beforeEach(() => {
      delete (window as any).__PULSEOPS_API_URL__;

      TestBed.configureTestingModule({
        providers: [provideHttpClient(), provideHttpClientTesting()],
      });

      service = TestBed.inject(MonitorService);
      httpTesting = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
      delete (window as any).__PULSEOPS_API_URL__;
      httpTesting.verify();
    });

    it('deve refletir alteração em window.__PULSEOPS_API_URL__ mesmo após a inicialização do serviço', () => {
      // 1. Primeira chamada antes do override: deve usar caminho relativo do proxy
      service.getMonitors().subscribe();
      const firstReq = httpTesting.expectOne('/api/monitors');
      firstReq.flush(mockMonitors);

      // 2. Modificação feita em runtime pelo desenvolvedor (ex.: console DevTools)
      (window as any).__PULSEOPS_API_URL__ = 'http://127.0.0.1:5001/';

      // 3. Segunda chamada: deve usar imediatamente o novo endereço sem barras extras
      service.getMonitors().subscribe();
      const secondReq = httpTesting.expectOne('http://127.0.0.1:5001/api/monitors');
      secondReq.flush(mockMonitors);

      // 4. Remoção do override: deve retornar ao caminho relativo do proxy
      delete (window as any).__PULSEOPS_API_URL__;

      // 5. Terceira chamada: deve retornar ao caminho relativo
      service.getMonitors().subscribe();
      const thirdReq = httpTesting.expectOne('/api/monitors');
      thirdReq.flush(mockMonitors);
    });
  });
});
