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

  beforeEach(() => {
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
    httpTesting.verify();
  });

  it('deve ser instanciado corretamente', () => {
    expect(service).toBeTruthy();
  });

  it('deve requisitar GET /api/monitors e retornar lista de monitores', () => {
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
