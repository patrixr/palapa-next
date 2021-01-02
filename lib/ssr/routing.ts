import { NextPageContext } from 'next'

export function redirectTo(ctx : NextPageContext, page : string) {
  ctx.res?.writeHead(302, { Location: page });
  ctx.res?.end();
}
