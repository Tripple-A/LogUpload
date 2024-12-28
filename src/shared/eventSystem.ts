import { EventEmitter } from 'events';

class EventSystem {
  private eventBus: EventEmitter;

  constructor() {
    this.eventBus = new EventEmitter();
  }

  publish(eventName: string, payload: object): void {
    this.eventBus.emit(eventName, payload);
  }

  subscribe(eventName: string, listener: (payload: object) => void): void {
    this.eventBus.on(eventName, listener);
  }
}

export default new EventSystem();
