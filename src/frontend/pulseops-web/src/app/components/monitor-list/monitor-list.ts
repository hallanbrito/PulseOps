import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MonitorService } from '../../services/monitor.service';
import { ServiceMonitor } from '../../models/monitor.model';

export type ViewState = 'loading' | 'empty' | 'success' | 'error';

@Component({
  selector: 'app-monitor-list',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './monitor-list.html',
  styleUrl: './monitor-list.scss',
})
export class MonitorList implements OnInit {
  private readonly monitorService = inject(MonitorService);

  readonly state = signal<ViewState>('loading');
  readonly monitors = signal<ServiceMonitor[]>([]);
  readonly errorMessage = signal<string | null>(null);

  ngOnInit(): void {
    this.loadMonitors();
  }

  loadMonitors(): void {
    this.state.set('loading');
    this.errorMessage.set(null);

    this.monitorService.getMonitors().subscribe({
      next: (data) => {
        this.monitors.set(data);
        this.state.set(data.length === 0 ? 'empty' : 'success');
      },
      error: (err) => {
        const detail = err?.status
          ? `Status ${err.status}: ${err.statusText || 'Falha de comunicação'}`
          : 'Falha de conexão com a API';
        this.errorMessage.set(`Não foi possível obter a lista de monitores (${detail}).`);
        this.state.set('error');
      },
    });
  }

  retry(): void {
    this.loadMonitors();
  }
}
