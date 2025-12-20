import { Injectable } from "@angular/core";
import { webSocket, WebSocketSubject } from "rxjs/webSocket";

@Injectable({ providedIn: "root" })
export class WebSocketService {
  private socket$: WebSocketSubject<string>;

  constructor() {
    this.socket$ = webSocket<string>({
      url: "wss://ws.ifelse.io",
      deserializer: (msg) => msg.data,
    });
  }

  get messages$() {
    return this.socket$.asObservable();
  }

  send(message: string) {
    this.socket$.next(message);
  }
}
