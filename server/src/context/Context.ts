import {
  ExpressRequestContext,
  JwtAuthContext,
  RequestContext
} from "@link1900/node-express";

export type Context = RequestContext & ExpressRequestContext & JwtAuthContext;
