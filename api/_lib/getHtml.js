function colors(tier, rating){
  const tierColor = {
    0: { 0: '#AD5600', 1: '#AD5600', 2: '#E84D0B' },
    1: { 0: '#435F7A', 1: '#435F7A', 2: '#75A8D7' },
    2: { 0: '#EC9A00', 1: '#EC9A00', 2: '#FFD000' },
    3: { 0: '#27E2A4', 1: '#27E2A4', 2: '#27D9E2' },
    4: { 0: '#00B4FC', 1: '#00B4FC', 2: '#0068FC' },
    5: { 0: '#FF0062', 1: '#FF0062', 2: '#FF0000' },
    6: { 0: '#FF7CA8', 1: '#B491FF', 2: '#7CF9FF' },
  }
  const userTier = Math.floor( ( tier - 1 ) / 5 ); // 언랭이면 0 나옴 조심
  const tierName = {
    0: 'Bronze',
    1: 'Silver',
    2: 'Gold',
    3: 'Platinum',
    4: 'Diamond',
    5: 'Ruby',
    6: 'Master',
  }
  const tierDivision = {
    0: 'V',
    1: 'IV',
    2: 'III',
    3: 'II',
    4: 'I',
  }
  const userColor = tier ? tierColor[userTier] : '#000000';
  const userNameColor = userTier === 6 ? // 세로
                        `linear-gradient(0deg, ${userColor[0]}, ${userColor[1]}, ${userColor[2]});` :
                        `${userColor[0]}`;
  const userProgressColor = userTier === 6 ? // 가로
                            `linear-gradient(to right, ${userColor[0]} 0%, ${userColor[1]} 50%, ${userColor[2]} 100%);` :
                            `linear-gradient(to right, ${userColor[0]} 0%, ${userColor[2]} 100%);`;
  const ratingCut = {
    0: 0,
    1: 30, 2: 60, 3: 90, 4: 120, 5: 150,
    6: 200, 7: 300, 8: 400, 9: 500, 10: 650,
    11: 800, 12: 950, 13: 1100, 14: 1250, 15: 1400,
    16: 1600, 17: 1750, 18: 1900, 19: 2000, 20: 2100,
    21: 2200, 22: 2300, 23: 2400, 24: 2500, 25: 2600,
    26: 2700, 27: 2800, 28: 2850, 29: 2900, 30: 2950,
    31: 3000,
  }
  const userTierProgress = tier==31 ? 100 : (rating - ratingCut[tier]) / (ratingCut[tier+1] - ratingCut[tier]) * 100;

  return { userTier, userNameColor, userProgressColor, userTierProgress, tierDivision, tierName };
}

//TODO: absolute로 위치 대충 잡기
//TODO: 랭크, 푼 문제 수, 기여 수, 클래스 깃허브처럼 표현
//TODO: 사용자가 푼 문제 수준별로 가져와서 상위 100문제 티어 비율 산정후 하단에 깃허브처럼 박기
//! outline <- 임시임

function setCss(tier, rating){
  const { userTier, userNameColor, userProgressColor, userTierProgress, tierDivision, tierName } = colors(tier, rating);
  return `
    .page {
      height: 630px;
      width: 1200px;
      position: static;
      outline: solid;
    }
    .profile {
      display: flex;
      flex-direction: column;
    }
    .profile__image {
      filter: drop-shadow(0px 4px 8px ${userNameColor}99);
    }
    .profile__info {
      display: flex;
      flex-direction: row;
      align-items: center;
    }
    .handle {
      font-size: 2rem;
      font-weight: bold;
    }
    .tier {
      display: flex;
      flex-direction: row;
      margin-left: 1rem;
      color: ${userNameColor};
    }
    .tier__badge {
      
    }
    .tier__name {
      font-size: 1.5rem;
    }
    .tier__rating {
      margin-left: 0.5rem;
      font-size: 1.5rem;
      font-weight: bold;
    }
    .progress {
      height: 25px;
      max-width: 500px;
      width: 100%;
      background-color: #000000;
      border-radius: 4px;
    }
    .progress__bar {
      height: 100%;
      border-radius: 4px;
      width: ${userTierProgress}%;
      background: ${userProgressColor};
    }
  `;
}

export function getHtml(data){
  const { handle, tier, rating, profileImageUrl } = data;
  const sclass = data.class;
  const sclass_deco = data.classDecoration == 'none' ? '' : data.classDecoration[0];
  const { userTier, userNameColor, userProgressColor, userTierProgress, tierDivision, tierName } = colors(tier, rating);
  return `<!DOCTYPE html>
  <html>
    <meta charset="utf-8">
    <title>${handle}'s solved profile</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
      ${setCss(tier, rating)}
    </style>
    <body>
      <div class="page">
        <div class="profile">
          <div class="profile__image">
            <img src="${profileImageUrl}" alt="profile" style="width: 100px; height: 100px; border-radius: 50%; object-fit:cover;">
          </div>
          <div class="profile__info">
            <div class="handle">${handle}</div>
            <div class="tier">
              <div class="tier__badge">
                <img src="/tier/${tier}.svg" alt="tier ${tier}" style="width: 30px;">
              </div>
              <div class="tier__name">${tier ? tierName[userTier] : 'Unranked'} ${tier ? tierDivision[(tier-1)%5] : ''}</div>
              <div class="tier__rating">${rating}</div>
            </div>
            <div class="class">
              <div class="class__badge">
                <img src="/class/c${sclass}${sclass_deco}.svg" alt="class ${sclass}" style="width: 30px;">
              </div>
            </div>
          </div>
        </div>
        <div class="progress">
          <div class="progress__bar"></div>
        </div>
      </div>
    </body>
  </html>`;
}
