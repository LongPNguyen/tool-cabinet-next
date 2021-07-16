import 'antd/dist/antd.css';
import { Provider } from 'next-auth/client'
import { useEffect } from 'react';

export default function App ({ Component, pageProps }) {
  useEffect(() => {
    typeof document !== undefined ? require('bootstrap/dist/js/bootstrap') : null
}, [])
  return (
    <Provider session={pageProps.session}>
      <Component {...pageProps} />
    </Provider>
  )
}