export interface ServiceMonitor {
  id: string;
  name: string;
  url: string;
  intervalSeconds: number;
  enabled: boolean;
  createdAtUtc: string;
}
