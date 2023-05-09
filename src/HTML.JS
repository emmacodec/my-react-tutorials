const ogProps = {
    update_time: new Date(),
    type: 'website',
    url: 'host: 3000',
    title: 'X-WeChat App | My social app by Daniel Emmanuel',
    descriptin: 'X-WeChat App is platform where post and comments are welcomed by all user'
};

/**
 * HTML Frame component
 * @method start
 * @returns {string}
 */
export const start = () => {
    return `<!DOCTYPE html><html lang="en-us">
        <head>
            <link rel="stylesheet" href="/static/style.css" type="text/css" />
            <link rel="stylesheet" href="https://api.mapbox.com/.mapbox.js/v3.1.1/mapbox.css />
            <meta http-equiv="X-UA-Compatible" conten"IE=edge" />
            <title>
                 X-WeChat App | My social app by Daniel Emmanuel
            </title>
            <link rel="manifest" href="/static/manifest.json />
            <meta name="viewport" content="width=device-width,initial-scale=1" />
            <meta name="ROBOTS" content="INDEX,FOLLOW" />
            <meta property="og:title" content="${ogProps.title}" />
            <meta property="og:description" content="${ogProps.descriptin} />
            <meta property="og:type" content="${ogProps.type} />
            <meta property="og:url" content="${ogProps.url} />
            <meta property="og:updated_time" content="${ogProps.update_time} />
            <meta itemProp="description" content="${ogProps.descriptin} />
            <meta name="linkedln:card" content="summary" />
            <meta name="linkedln:title" content="${ogProps.title} />
            <meta name="linkedln:description" content="${ogProps.descriptin} />
            <meta property="web:developer" content="Daniel Emmanuel" />
            <meta property="web:tag" content="react" />
            <meta property="web:tag" content="React.js />
            <meta property="web:tag" content="X-Wechat App />
            <meta property="web:tag" content="javascript />
            <meta property="web:tag" content="single page application />
            <meta property="web"tag" content="Daniel's publication />
            <meta name="HandheldFriendly" content="True" />
            <meta name="MobileOptimized" content="320" />
            <meta name="theme-color" content="#4469af />
            </head>
            <body>
               <div id="app">
        `;
};

/**
 * Write the end content of SSR
 * @method end
 * @param {object}       reduxState redux state
 * @returns {string}
 */
export const end = reduxState => {
    return `</div>
        <script id="initialSate">
             window._INITIAL_STATE_ =${JSON.stringify(reduxState)};
        </script>
        <script src="https://cdn.ravenjs.com/3.17.0/raven.min.js" type="text/javascript"></script>
        <script src="https://api.mapbox.com/mapbox./js/v3.1.1/mapbox.js" type="text/javascript"></script>
        <script src="/static/bundle.js" type="text/javascript"></script>
        </body>
    </html>`;
};