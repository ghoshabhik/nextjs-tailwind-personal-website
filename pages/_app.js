import { SiNextDotJs } from "react-icons/si";
import { SiNetlify } from "react-icons/si";
import Header from '../components/Header'
import { SWRConfig } from 'swr';
import Head from 'next/head'
import {ThemeProvider} from 'next-themes'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return <>
  <Head>
        <title>PaperScripted - Blogs</title>
  </Head>
  <ThemeProvider attribute="class" defaultTheme='light'>
  <Header />
  <SWRConfig
            value={{ dedupingInterval: 5000, revali: false }}
  >
  <main className="font-body">
    <Component {...pageProps} />
  </main>
  </SWRConfig>
  <hr />
      <footer className="pb-3">
        <div className="flex flex-col">
          <div className="text-center">abhik.ghosh5@gmail.com</div>
          <div className="flex items-center justify-center gap-x-2">
            Created using{' '}
              <SiNextDotJs />
              Hosted on{' '}
              <SiNetlify />
          </div>
        </div>
      </footer>
  </ThemeProvider>
</>
}

export default MyApp
