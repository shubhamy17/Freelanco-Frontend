import "../styles/globals.css";
// import { MoralisProvider } from "react-moralis";
import NavBar from "../components/NavBar";
import { AuthProvider } from "../hooks/useAuth";
import { GigsProvider } from "../hooks/useGigs";
import { Analytics } from "@vercel/analytics/react";

import {
  createClient,
  configureChains,
  defaultChains,
  WagmiConfig,
} from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { SessionProvider } from "next-auth/react";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { InjectedConnector } from "wagmi/connectors/injected";
// import { RecoilRoot } from "recoil";

import "@rainbow-me/rainbowkit/styles.css";

import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import {
  mainnet,
  polygonMumbai,
  polygon,
  optimism,
  arbitrum,
} from "wagmi/chains";
import Footer from "../components/Footer";

const { chains, provider, webSocketProvider } = configureChains(
  [polygon, polygonMumbai],
  [
    alchemyProvider({ apiKey: "DCuuaKXQnJt77BZ_L0eOZTsTwmWOpNk5" }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "My RainbowKit App",
  projectId: "efe192df7fce8e7c10c17050418fffc8",
  chains,
});

const client = createClient({
  provider,
  webSocketProvider,
  autoConnect: true,
  connectors,
});

function MyApp({ Component, pageProps }) {
  return (
    <WagmiConfig client={client}>
      <SessionProvider session={pageProps.session} refetchInterval={0}>
        {/* <MoralisProvider initializeOnMount={false}> */}
          <RainbowKitProvider chains={chains} theme={darkTheme()}>
            <AuthProvider>
              <GigsProvider>
                {/* <RecoilRoot> */}
                  <NavBar />
                  <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0"
                  />
                  <Component {...pageProps} />
                  <Analytics />
                {/* </RecoilRoot> */}
              </GigsProvider>
            </AuthProvider>
          </RainbowKitProvider>
        {/* </MoralisProvider> */}
      </SessionProvider>
    </WagmiConfig>
  );
}

export default MyApp;
