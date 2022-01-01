import withTwindDocuemnt from '@twind/next/document'
import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,

} from 'next/document'
import { setup } from 'twind'
import twindConfig from 'twind.config'

setup({
  theme: twindConfig.theme,
  darkMode: twindConfig.darkMode,
  mode: 'silent',
  preflight: twindConfig.preflight,
})

class RootDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    // const initialProps = await Document.getInitialProps(ctx)
    // return initialProps
    return await Document.getInitialProps(ctx)
  }
  render() {
    return (
      <Html className="dark" data-theme="dark" lang="en">
        <Head>
          <meta name="description" content="" />
          <link
            rel="icon"
            href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🐦</text></svg>"
          />
          <link
            href="https://cdn.jsdelivr.net/npm/daisyui@1.20.0/dist/full.css"
            rel="stylesheet"
            type="text/css"
          />
          {/* <link
            href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2/dist/tailwind.min.css"
            rel="stylesheet"
            type="text/css"
          /> */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
export default withTwindDocuemnt(twindConfig, RootDocument)
