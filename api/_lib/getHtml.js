
function setCss(tier, rating){
  const tierColor = {
    0: { 0: '#AD5600', 1: '#AD5600', 2: '#AD5600' },
    1: { 0: '#435F7A', 1: '#435F7A', 2: '#435F7A' },
    2: { 0: '#EC9A00', 1: '#EC9A00', 2: '#EC9A00' },
    3: { 0: '#27E2A4', 1: '#27E2A4', 2: '#27E2A4' },
    4: { 0: '#00B4FC', 1: '#00B4FC', 2: '#00B4FC' },
    5: { 0: '#FF0062', 1: '#FF0062', 2: '#FF0062' },
    6: { 0: '#FF7CA8', 1: '#B491FF', 2: '#7CF9FF' }, // 마스터는 그라디언트
  }
  const userTier = Math.floor( ( tier - 1 ) / 5 ); // 언랭이면 0 나옴 조심
  const userColor = tier ? tierColor[userTier] : '#000000';
  const userNameColor = `linear-gradient(0deg, ${userColor[0]}, ${userColor[1]}, ${userColor[2]});`; //세로
  const userProgressColor = `linear-gradient(to right, ${userColor[0]} 0%, ${userColor[1]} 50%, ${userColor[2]} 100%);`; //가로
  const userTierProgress = tier==31 ? 100 : rating-100 - tier*100; // 티어 기준표대로 수정하기
  return `
    .unrated {
      color: #000000;
    }
    .bronze {
      color: #AD5600;
    }
    .silver {
      color: #435F7A;
    }
    .gold {
      color: #EC9A00;
    }
    .platinum {
      color: #27E2A4;
    }
    .diamond {
      color: #00B4FC;
    }
    .ruby {
      color: #FF0062;
    }
    .progress {
      height: 30px;
      max-width: 500px;
      width: 100%;
      background-color: #000000;
    }
    .progress__bar {
      height: 100%;
      width: ${userTierProgress}%;
      background-image: ${userProgressColor};
    }
  `;
}

export function getHtml(data){
  const { handle, tier, rating } = data;
  return `<!DOCTYPE html>
  <html>
    <meta charset="utf-8">
    <title>${handle}'s solved profile</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
      ${setCss(tier, rating)}
    </style>
    <body>
      <div>
        <div class="progress">
          <div class="progress__bar"></div>
        </div>
      </div>
    </body>
  </html>`;
}
