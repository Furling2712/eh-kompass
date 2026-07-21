import type { APIRoute } from 'astro';
import { CLIENT_COOKIE_NAME } from '../../lib/auth';

export const prerender = false;

export const POST: APIRoute = ({ cookies, redirect }) => {
  cookies.delete(CLIENT_COOKIE_NAME, { path: '/' });
  return redirect('/online-bewo/login');
};
