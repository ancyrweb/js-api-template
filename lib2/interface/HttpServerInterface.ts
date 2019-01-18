export interface HttpServerInterface {
  start();
}

export type HttpMethod = "GET" | "POST" | "DELETE" | "PATCH" | "PUT" | "HEAD" | "OPTIONS" | "ALL";