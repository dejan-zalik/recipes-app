export { default } from 'next-auth/middleware';

export const config = {
  matcher: ['/recipes', '/recipes/add', '/recipes/edit'],
};
