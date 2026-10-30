import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { MonitorList } from './monitor-list';
import { MonitorService } from '../../services/monitor.service';
import { ServiceMonitor } from '../../models/monitor.model';

describe('MonitorList', () => {
  let component: MonitorList;
  let fixture: ComponentFixture<MonitorList>;
  let monitorServiceSpy: { getMonitors: ReturnType<typeof vi.fn> };

  const mockMonitors: ServiceMonitor[] = [
    {
      id: 'aaaa1111-1111-1111-1111-111111111111',
      name: 'API Pagamentos',
      url: 'https://pay.example.com/health',
      intervalSeconds: 60,
      enabled: true,
      createdAtUtc: '2026-10-30T08:00:00Z',
    },
    {
      id: 'bbbb2222-2222-2222-2222-222222222222',
      name: 'Auth Service',
      url: 'https://auth.example.com/ping',
      intervalSeconds: 30,
      enabled: false,
      createdAtUtc: '2026-10-30T08:30:00Z',
    },
  ];

  beforeEach(async () => {
    monitorServiceSpy = {
      getMonitors: vi.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [MonitorList],
      providers: [{ provide: MonitorService, useValue: monitorServiceSpy }],
    }).compileComponents();
  });

  it('deve criar o componente', () => {
    monitorServiceSpy.getMonitors.mockReturnValue(of([]));
    fixture = TestBed.createComponent(MonitorList);
    component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('deve exibir estado de carregamento enquanto aguarda a resposta', () => {
    // Retorna observable que não emite imediatamente
    monitorServiceSpy.getMonitors.mockReturnValue(of());
    fixture = TestBed.createComponent(MonitorList);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component.state()).toBe('loading');
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.loading-state')).toBeTruthy();
    expect(compiled.textContent).toContain('Carregando monitores...');
  });

  it('deve exibir estado de lista vazia quando a API retornar array vazio', () => {
    monitorServiceSpy.getMonitors.mockReturnValue(of([]));
    fixture = TestBed.createComponent(MonitorList);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component.state()).toBe('empty');
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.empty-state')).toBeTruthy();
    expect(compiled.textContent).toContain('Nenhum monitor cadastrado');
  });

  it('deve exibir a lista de monitores quando a API retornar dados reais', () => {
    monitorServiceSpy.getMonitors.mockReturnValue(of(mockMonitors));
    fixture = TestBed.createComponent(MonitorList);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component.state()).toBe('success');
    expect(component.monitors().length).toBe(2);

    const compiled = fixture.nativeElement as HTMLElement;
    const cards = compiled.querySelectorAll('.monitor-card');
    expect(cards.length).toBe(2);

    expect(compiled.textContent).toContain('API Pagamentos');
    expect(compiled.textContent).toContain('https://pay.example.com/health');
    expect(compiled.textContent).toContain('60s');
    expect(compiled.textContent).toContain('Habilitado');

    expect(compiled.textContent).toContain('Auth Service');
    expect(compiled.textContent).toContain('https://auth.example.com/ping');
    expect(compiled.textContent).toContain('30s');
    expect(compiled.textContent).toContain('Desabilitado');
  });

  it('deve exibir mensagem de erro e botão de retry quando a chamada à API falhar', () => {
    const errorObj = { status: 503, statusText: 'Service Unavailable' };
    monitorServiceSpy.getMonitors.mockReturnValue(throwError(() => errorObj));

    fixture = TestBed.createComponent(MonitorList);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component.state()).toBe('error');
    expect(component.errorMessage()).toContain('Status 503: Service Unavailable');

    const compiled = fixture.nativeElement as HTMLElement;
    const errorPanel = compiled.querySelector('.error-state');
    expect(errorPanel).toBeTruthy();
    expect(compiled.textContent).toContain('Erro ao carregar monitores');

    const retryButton = compiled.querySelector('.error-state button') as HTMLButtonElement;
    expect(retryButton).toBeTruthy();
    expect(retryButton.textContent).toContain('Tentar novamente');
  });

  it('deve recarregar os dados ao acionar retry e recuperar estado com sucesso', () => {
    const errorObj = { status: 500, statusText: 'Internal Error' };
    monitorServiceSpy.getMonitors.mockReturnValueOnce(throwError(() => errorObj));

    fixture = TestBed.createComponent(MonitorList);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component.state()).toBe('error');

    // Configura o spy para retornar sucesso na segunda chamada
    monitorServiceSpy.getMonitors.mockReturnValueOnce(of(mockMonitors));

    const compiled = fixture.nativeElement as HTMLElement;
    const retryButton = compiled.querySelector('.error-state button') as HTMLButtonElement;
    retryButton.click();
    fixture.detectChanges();

    expect(monitorServiceSpy.getMonitors).toHaveBeenCalledTimes(2);
    expect(component.state()).toBe('success');
    expect(component.monitors().length).toBe(2);
    expect(compiled.querySelectorAll('.monitor-card').length).toBe(2);
  });
});
