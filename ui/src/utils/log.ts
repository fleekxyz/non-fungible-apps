import { pushToast } from './toast';

export abstract class AppLog {
  static readonly IDENTIFIER = '[daowabunga]';

  static error(...args: any[]): void {
    // eslint-disable-next-line no-console
    console.error(this.IDENTIFIER, ...args);
  }

  static warn(...args: any[]): void {
    // eslint-disable-next-line no-console
    console.warn(this.IDENTIFIER, ...args);
  }

  static errorToast(message: string, ...args: any[]): void {
    this.error(message, ...args);
    pushToast('error', message);
  }
}
