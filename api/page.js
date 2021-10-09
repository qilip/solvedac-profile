import { getRedirectHtml } from './_lib/getRedirectHtml.js';

export default async (req, res) => {
  try{
    const handle = req.query.handle;
    const html = getRedirectHtml(handle);
    res.setHeader('Content-Type', `text/html`);
    res.setHeader('Cache-Control', `public, s-maxage=60, max-age=60, stale-if-error=604800`);
    res.end(html);
  }catch(e){
    res.statusCode = 500;
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.end('<h1>Internal Server Error</h1><p>처리 중 오류가 발생했습니다.</p>');
    console.error(e);
  }
}
