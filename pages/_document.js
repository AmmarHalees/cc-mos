import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang='en'>
        <Head>
          {/* Site-level meta tags */}
          <meta charSet='utf-8' />
          <meta locale='en' />
          <meta content='IE=edge' httpEquiv='X-UA-Compatible' />
          <meta name='theme-color' content='#da532c' />
          <meta name='msapplication-TileColor' content='#ffffff' />
          <meta name='msapplication-config' content='/favicons/browserconfig.xml' />
          <meta name='mobile-web-app-capable' content='yes' />
          <meta name='apple-mobile-web-app-capable' content='yes' />
          <meta name='application-name' content={process.env.SITE_NAME_EN} />

          <link href='/favicons/favicon.ico' rel='shortcut icon' />
          <link href='/manifest.json' rel='manifest' />
          <link href='/favicons/apple-touch-icon.png' rel='apple-touch-icon' sizes='180x180' />
          <link href='/favicons/favicon-32x32.png' rel='icon' sizes='32x32' type='image/png' />
          <link href='/favicons/favicon-16x16.png' rel='icon' sizes='16x16' type='image/png' />
          <link color='#5bbad5' href='/favicons/safari-pinned-tab.svg' rel='mask-icon' />    </Head>
        <body data-theme="light">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
