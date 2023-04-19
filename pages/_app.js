import "../styles/globals.css";
import { MoralisProvider } from "react-moralis";
import NavBar from "../components/NavBar";
import { AuthProvider } from "../hooks/useAuth";
import { GigsProvider } from "../hooks/useGigs";

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
import { RecoilRoot } from "recoil";

import "@rainbow-me/rainbowkit/styles.css";

import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  polygonMumbai,
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
        <MoralisProvider initializeOnMount={false}>
          <RainbowKitProvider chains={chains}>
            <AuthProvider>
              <GigsProvider>
                <RecoilRoot>
                  <NavBar />
                  <Component {...pageProps} />
                </RecoilRoot>
              </GigsProvider>
            </AuthProvider>
          </RainbowKitProvider>
        </MoralisProvider>
      </SessionProvider>
    </WagmiConfig>
  );
}

export default MyApp;
