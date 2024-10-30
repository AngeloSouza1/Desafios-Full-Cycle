export default class EventDispatcher {
    private eventHandlers: { [eventName: string]: any[] } = {};
  
    register(eventName: string, eventHandler: any): void {
      if (!this.eventHandlers[eventName]) {
        this.eventHandlers[eventName] = [];
      }
      this.eventHandlers[eventName].push(eventHandler);
    }
  
    unregister(eventName: string, eventHandler: any): void {
      if (this.eventHandlers[eventName]) {
        const index = this.eventHandlers[eventName].indexOf(eventHandler);
        if (index !== -1) {
          this.eventHandlers[eventName].splice(index, 1);
        }
      }
    }
  
    notify(event: any): void {
      const eventName = event.constructor.name;
      if (this.eventHandlers[eventName]) {
        for (const handler of this.eventHandlers[eventName]) {
          handler.handle(event);
        }
      }
    }
  }
  