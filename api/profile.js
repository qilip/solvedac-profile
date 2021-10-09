import { getUserData } from './_lib/getData.js';
import { getHtml } from './_lib/getHtml.js';

export default async (req, res) => {
  try{
    const handle = req.query.handle;
    // const userData = await getUserData(handle);
    const userData = {
      handle: 'qilip',
      tier: 31,
      rating: 3000,
    };
    const html = getHtml(userData);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.end(html);
    // const image = getImage(html);
    // res.statusCode = 200;
    // res.setHeader('Content-Type', 'image/png');
    // res.setHeader('Cache-Control', 'public, s-maxage=60, max-age=60, stale-if-error=604800');
    // res.end(image);
  }catch(e){
    res.statusCode = 500;
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.end('<h1>Internal Server Error</h1><p>프로필 이미지 생성 중 오류가 발생했습니다.</p>');
    console.error(e);
  }
}
