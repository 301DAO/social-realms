import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentProps,
  DocumentContext,
  DocumentInitialProps,
} from 'next/document';
import * as React from 'react';

export default class Doc extends Document<DocumentProps> {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  // TODO: add metatags, twitter stuff, etc.
  render(): React.ReactElement {
    return (
      <Html lang="en">
        <Head>
          <meta name="Social Realms" content="" />
          <link
            rel="icon"
            href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🐦</text></svg>"
          />
        </Head>
        <body className="text-white dark:bg-black dark:text-black">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
