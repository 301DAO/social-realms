import withTwindDocuemnt from '@twind/next/document'
import Document, { Head, Html, Main, NextScript } from 'next/document'
import { setup } from 'twind'
import twindConfig from 'twind.config'

setup({
  theme: twindConfig.theme,
  darkMode: twindConfig.darkMode,
  mode: 'silent',
  preflight: twindConfig.preflight
})

class RootDocument extends Document {
  static async getInitialProps(ctx: any) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }
  render() {
    return (
      <Html className="dark" lang="en">
        <Head />
        <Main />
        <NextScript />
      </Html>
    )
  }
}
export default withTwindDocuemnt(twindConfig, RootDocument)
