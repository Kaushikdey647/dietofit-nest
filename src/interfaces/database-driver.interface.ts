export interface DatabaseDriver {
  init(): Promise<void>;
  healthCheck(): Promise<'ok' | 'error'>;
  close?(): Promise<void>;
}
