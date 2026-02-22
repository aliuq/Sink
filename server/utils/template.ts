import type { Link } from '#shared/schemas/link'
import { escape } from 'es-toolkit/string'
import { parseURL } from 'ufo'

function buildMetaTags(link: Link, baseUrl: string) {
  const { host: hostname } = parseURL(link.url)
  const title = link.title || hostname || 'Link'
  const hasImage = !!link.image
  const imageUrl = hasImage && link.image!.startsWith('/')
    ? `${baseUrl}${link.image}`
    : link.image
  const twitterCard = hasImage ? 'summary_large_image' : 'summary'

  const tags = [
    link.description ? `<meta name="description" content="${escape(link.description)}">` : '',
    `<meta property="og:type" content="website">`,
    `<meta property="og:url" content="${escape(baseUrl)}/${escape(link.slug)}">`,
    `<meta property="og:title" content="${escape(title)}">`,
    link.description ? `<meta property="og:description" content="${escape(link.description)}">` : '',
    hasImage ? `<meta property="og:image" content="${escape(imageUrl!)}">` : '',
    `<meta name="twitter:card" content="${twitterCard}">`,
    `<meta name="twitter:title" content="${escape(title)}">`,
    link.description ? `<meta name="twitter:description" content="${escape(link.description)}">` : '',
    hasImage ? `<meta name="twitter:image" content="${escape(imageUrl!)}">` : '',
  ].filter(Boolean).join('\n    ')

  return { title, tags }
}

export function generateCloakingHtml(link: Link, targetUrl: string, baseUrl: string): string {
  const { title, tags } = buildMetaTags(link, baseUrl)

  return `<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>${escape(title)}</title>
    ${tags}
    <style>body{margin:0;overflow:hidden}iframe{width:100vw;height:100vh;border:none}</style>
</head>
<body>
    <iframe src="${escape(targetUrl)}" sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox" allowfullscreen referrerpolicy="no-referrer"></iframe>
    <noscript><meta http-equiv="refresh" content="0;url=${escape(targetUrl)}"></noscript>
</body>
</html>`
}

export function generatePasswordHtml(slug: string, hasError: boolean = false): string {
  return `<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <meta name="robots" content="noindex">
    <title>Password Required</title>
    <style>
      *{margin:0;padding:0;box-sizing:border-box}
      body{font-family:-apple-system,system-ui,sans-serif;min-height:100vh;display:flex;align-items:center;justify-content:center;background:#fafafa}
      .card{background:#fff;border:1px solid #e5e5e5;border-radius:8px;padding:2rem;width:100%;max-width:360px;margin:1rem}
      h1{font-size:1.125rem;font-weight:600;margin-bottom:1.5rem;text-align:center}
      .error{color:#dc2626;font-size:.875rem;margin-bottom:1rem;text-align:center}
      label{display:block;font-size:.875rem;font-weight:500;margin-bottom:.5rem}
      input[type=password]{width:100%;padding:.5rem .75rem;border:1px solid #d4d4d4;border-radius:6px;font-size:.875rem;outline:none}
      input[type=password]:focus{border-color:#a3a3a3;box-shadow:0 0 0 2px rgba(163,163,163,.2)}
      button{width:100%;margin-top:1rem;padding:.5rem;background:#171717;color:#fff;border:none;border-radius:6px;font-size:.875rem;font-weight:500;cursor:pointer}
      button:hover{background:#404040}
    </style>
</head>
<body>
    <div class="card">
        <h1>Password Required</h1>${hasError ? '\n        <p class="error">Incorrect password</p>' : ''}
        <form method="POST" action="/${escape(slug)}">
            <label for="password">Password</label>
            <input type="password" id="password" name="password" required autofocus placeholder="Enter password">
            <button type="submit">Continue</button>
        </form>
    </div>
</body>
</html>`
}

export function generateOgHtml(link: Link, targetUrl: string, baseUrl: string): string {
  const { title, tags } = buildMetaTags(link, baseUrl)

  return `<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>${escape(title)}</title>
    ${tags}
    <meta http-equiv="refresh" content="1;url=${escape(targetUrl)}">
</head>
<body>
    <p>Redirecting to <a href="${escape(targetUrl)}">${escape(targetUrl)}</a>...</p>
</body>
</html>`
}
