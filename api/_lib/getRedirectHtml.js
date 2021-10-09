
export function getRedirectHtml(handle){
  return `<!DOCTYPE html>
  <html>
    <meta charset="utf-8">
    <title>${handle}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta property="og:title" content="${handle}">
    <meta property="og:description" content="${handle}'s sovled stat"> 
    <meta property="og:url" content="https://solved.abys.dev/${handle}">
    <meta property="og:image" content="https://solved.abys.dev/p/${handle}">
    <body>
      <div>
        <script>
          window.location.replace("https://solved.ac/profile/${handle}");
        </script>
      </div>
    </body>
  </html>`;
}
