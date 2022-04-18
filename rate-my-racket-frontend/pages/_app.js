import '../styles/globals.css'

import "bootstrap/dist/css/bootstrap.min.css";

import Layout from "../components/Layout";

import { AuthProvider } from "../context/AuthContext"

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  );
}

export default MyApp
