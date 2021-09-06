import type { AppProps } from 'next/app'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="bg-gray-50 p-4 md:p-8">
      <Component {...pageProps} />
    </div>
  )
}
export default MyApp
