import type { AppProps } from 'next/app'
import Head from 'next/head'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Blockchain Gakuen</title>
        <link rel="icon" type="image/png" href="/bca.png" key="favicon" />
      </Head>

      <div className="p-4 md:p-8">
        <Component {...pageProps} />
      </div>
    </>
  )
}
export default MyApp
