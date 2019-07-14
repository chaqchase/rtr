import type { Server, IncomingMessage, ServerResponse } from "http";
import http from "http";

const defaults = {
  port: 3000,
};

interface IRouterOptions {
  port?: number;
  server: Server;
}

interface IRoute {
  path: string;
  handler: (req: IncomingMessage, res: ServerResponse) => void;
}

interface IRouteMap {
  [key: string]: IRoute[];
}

interface IRouter {
  routes: IRouteMap;
  get(
    path: string,
    handler: (req: IncomingMessage, res: ServerResponse) => void
  ): void;
  post(
    path: string,
    handler: (req: IncomingMessage, res: ServerResponse) => void
  ): void;
  put(
    path: string,
    handler: (req: IncomingMessage, res: ServerResponse) => void
  ): void;
  delete(
    path: string,
    handler: (req: IncomingMessage, res: ServerResponse) => void
  ): void;
  listen(port?: number, callback?: () => void): void;
  onListen(): void;
  onError(err: Error): void;
  onMatch(req: IncomingMessage, res: ServerResponse, route: any): void;
  onNoMatch(req: IncomingMessage, res: ServerResponse): void;
  _handleRoute(req: IncomingMessage, res: ServerResponse): void;
  _handleMethod(req: IncomingMessage, res: ServerResponse, route: any): void;
  _handleRequest(req: IncomingMessage, res: ServerResponse): void;
  _handleError(req: IncomingMessage, res: ServerResponse, err: Error): void;
}

class Router {
  port: number;
  server: Server;
  routes: IRouteMap;

  constructor(options: IRouterOptions) {
    this.port = options.port || defaults.port;
    this.server = options.server;
    this.routes = {};
  }

  listen(port?: number, callback?: () => void) {
    this.server.listen(port || this.port, callback || this.onListen);
  }

  onListen() {
    console.log(`Server listening on port ${this.port}`);
  }
}

const router = new Router({
  server: http.createServer(),
  port: 3000,
});
