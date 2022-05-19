import { getUserData } from './_lib/getData.js';
import { getHtml } from './_lib/getHtml.js';

export default async (req, res) => {
  try{
    const handle = req.query.handle;
    // const userData = await getUserData(handle);
    const temp = `
    {
      "handle": "qilip",
      "bio": "PS 접음 ㅅㄱ",
      "organizations": [
        {
          "organizationId": 328,
          "name": "아주대학교",
          "type": "university",
          "rating": 2669,
          "userCount": 325,
          "voteCount": 828,
          "solvedCount": 4429,
          "color": "#000000"
        },
        {
          "organizationId": 461,
          "name": "군대",
          "type": "community",
          "rating": 2876,
          "userCount": 165,
          "voteCount": 3914,
          "solvedCount": 7592,
          "color": "#000000"
        }
      ],
      "badge": {
        "badgeId": "grass_05",
        "badgeImageUrl": "https://static.solved.ac/profile_badge/grass_05.png",
        "unlockedUserCount": 463,
        "displayName": "새싹5단계",
        "displayDescription": "32일 연속 문제 해결"
      },
      "background": {
        "backgroundId": "grass_30",
        "backgroundImageUrl": "https://static.solved.ac/profile_bg/grass_30/grass_30.png",
        "author": "havana723",
        "authorUrl": "",
        "unlockedUserCount": 459,
        "displayName": "30일의 성실함",
        "displayDescription": "30일 연속으로 문제를 해결했다"
      },
      "profileImageUrl": "/qilip-picture_test.png",
      "solvedCount": 453,
      "voteCount": 38,
      "class": 7,
      "classDecoration": "none",
      "tier": 21,
      "rating": 2251,
      "ratingByProblemsSum": 1798,
      "ratingByClass": 220,
      "ratingBySolvedCount": 157,
      "ratingByVoteCount": 25,
      "exp": 66033415,
      "rivalCount": 17,
      "reverseRivalCount": 6,
      "maxStreak": 32,
      "rank": 462
    }`;
    const userData = JSON.parse(temp);
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
