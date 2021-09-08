import type { AppProps } from 'next/app'
import Head from 'next/head'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  const metadata = {
    type: 'website',
    title: 'Gakuen Loot Viewer',
    description: 'Useful viewer for Gakuen Loot',
    url: `${process.env.CLIENT_ORIGIN}/`,
    imageUrl: `${process.env.CLIENT_ORIGIN}/ogp.png`,
    twitterCard: 'summary_large_image',
  }

  return (
    <>
      <Head>
        <title key="title">{metadata.title}</title>
        <meta
          name="description"
          content={metadata.description}
          key="description"
        />
        <meta property="og:type" content={metadata.type} key="og:type" />
        <meta property="og:title" content={metadata.title} key="og:title" />
        <meta
          property="og:description"
          content={metadata.description}
          key="og:description"
        />
        <meta property="og:image" content={metadata.imageUrl} key="og:image" />
        <meta property="og:url" content={metadata.url} key="og:url" />
        <meta
          property="og:site_name"
          content={metadata.title}
          key="og:site_name"
        />
        <meta
          name="twitter:card"
          content={metadata.twitterCard}
          key="twitter:card"
        />
        <meta name="twitter:site" content={metadata.title} key="twitter:site" />
        <link rel="icon" type="image/png" href="/bca.png" key="favicon" />
      </Head>

      <div className="p-4 md:p-8">
        <Component {...pageProps} />
      </div>
    </>
  )
}
export default MyApp
