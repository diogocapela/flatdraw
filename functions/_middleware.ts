const allowed = ['http://localhost:3000', 'https://flatdraw.com'];

export const onRequestOptions: PagesFunction = async () => {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': allowed.join(', '),
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Max-Age': '86400',
    },
  });
};

export const onRequest: PagesFunction = async ({ request, next }) => {
  const response = await next();
  const origin = request.headers.get('Origin');
  if (allowed.includes(origin)) {
    response.headers.set('Access-Control-Allow-Origin', origin);
  }
  response.headers.set('Access-Control-Max-Age', '86400');
  return response;
};
