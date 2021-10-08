import React, { useState, useEffect } from "react";
import { Layout, SEO, Button, Card, Text } from "components/common";
import { Header } from "components/theme";
import * as pagesUtils from "../utils/pagesUtils";

import shineLogoV7 from "assets/illustrations/shine-logo-v7.png";
import ProgressBar from "react-bootstrap/ProgressBar";
import PulseLoader from "react-spinners/PulseLoader";

const introductionsChannel = "https://discord.com/channels/785582893572948060/868084312455651348";
const inviteLink = "https://discord.com/invite/QkhbP7bZrj";
const authorizeAccountLink = `https://discord.com/api/oauth2/authorize?response_type=token&client_id=893462659737985114&state=15773059ghq9183habn&scope=identify&redirect_uri=${process.env.GATSBY_REDIRECT_URI}`;
export default ({ location }) => {
  const [isWalletEnabled, setWalletStatus] = useState();
  const [contributorDetected, setContributorDetected] = useState();
  const [contributorError, setContributorError] = useState();
  const [registrationSuccess, setRegistrationSuccess] = useState(); // if user managed to register as contributor
  const [txnHash, setTxnHash] = useState();

  const [loading, setLoading] = useState(false); // if user managed to register as contributor

  const [addedToMetamask, setAddedToMetamask] = useState();

  const [tokenReward, setTokenReward] = useState();
  const [serverVerified, setServerVerified] = useState();
  const [messageVerified, setMessageVerified] = useState();

  const [chainId, setChainId] = useState(1);
  const [currentAccount, setCurrentAccount] = useState(null);

  const [chainName, setChainName] = useState(1);

  const [currentPage, setCurrentPage] = useState(1);
  const [accessCode, setAccessCode] = useState();
  const [username, setUsername] = useState();
  const [accId, setAccId] = useState();
  const [avatarId, setAvatarId] = useState();
  useEffect(() => {
    if (typeof accessCode !== "undefined") {
      console.log("acc code 623", accessCode);
      pagesUtils.loadWeb3(setWalletStatus, setChainId, currentAccount, setCurrentAccount);
    }
  }, [accessCode]);

  useEffect(() => {
    pagesUtils.decodeUrlFragment(location.hash, setAccessCode, setUsername, setAccId, setAvatarId, setTokenReward);
    console.log("acces code set", accessCode);
  }, [location.hash]);

  useEffect(() => {
    console.log("recognzied", chainId);
    setChainName(pagesUtils.chainIdToName(chainId));
  }, [chainId]);

  return (
    <Layout position="absolute" bottom="4px" width="100%" height="60px">
      <SEO />
      <Header />
      <div style={{ display: "flex", alignItems: "center", flexDirection: "column", paddingBottom: "200px" }}>
        {false && (
          <h1>
            Contributor Onboarding/ Chain id : {chainId} and name : {chainName}
          </h1>
        )}
        <br></br> <br></br>
        {isWalletEnabled &&
        username && ( //if wallet connected and user identified
            <div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <p>
                  Welcome onboard <b>{username}</b> !
                </p>
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <img style={{ borderRadius: "10%", boxShadow: "0 0 7px 1px" }} src={`https://cdn.discordapp.com/avatars/${accId}/${avatarId}.png`}></img>
                <br></br> <br></br>
                <br></br>
              </div>
            </div>
          )}
        {renderPage(
          isWalletEnabled,
          username,
          accId,
          avatarId,
          accessCode,
          setTokenReward,
          serverVerified,
          setServerVerified,
          messageVerified,
          setMessageVerified,
          chainId,
          addedToMetamask,
          setAddedToMetamask,
          contributorDetected,
          setContributorDetected,
          currentAccount,
          contributorError,
          setContributorError,
          registrationSuccess,
          setRegistrationSuccess,
          currentPage,
          setCurrentPage,
          loading,
          setLoading,
          txnHash,
          setTxnHash
        )}
        <br></br>
        <br></br>
        <br></br>
        {false && isWalletEnabled && username && <p>Current page {currentPage}</p>}
        <div style={{ display: "flex" }}>
          {pagesUtils.isBackButtonVisible(currentPage, isWalletEnabled, username, serverVerified, chainId == "0x89") && (
            <Button style={{ marginRight: 15 }} onClick={() => setCurrentPage(currentPage - 1)}>
              BACK{" "}
            </Button>
          )}
          {pagesUtils.isNextButtonVisible(currentPage, isWalletEnabled, username, serverVerified, chainId == "0x89") && (
            <Button style={{ marginLeft: 15 }} onClick={() => setCurrentPage(currentPage + 1)}>
              NEXT{" "}
            </Button>
          )}
        </div>
        {!isWalletEnabled && (
          <div style={{ width: "220px" }}>
            <Card
              onClick={() => pagesUtils.loadWeb3(setWalletStatus, setChainId, currentAccount, setCurrentAccount)}
              borderRadius="4px"
              border="1px solid white"
              color="white"
              background="#1E1E1E"
              clickable
              width="100%"
              height="48px"
              margin="5px 0 0 0"
            >
              <Text fontWeight={800} color="white">
                CONNECT WALLET
              </Text>
            </Card>
          </div>
        )}
        {isWalletEnabled && username && (
          <p>
            <br></br>
            <br></br>
            <b>Tokens earned: </b>
            {tokenReward} <img style={{ height: "23px" }} src={shineLogoV7}></img>
            {" (SHN)"}
          </p>
        )}
        {isWalletEnabled && (
          <div>
            <ProgressBar style={{ width: "300px" }} animated striped variant="success" now={(currentPage / 4) * 100} label={` Step ${currentPage}`} />
          </div>
        )}
      </div>
    </Layout>
  );
};

function renderPage(
  isWalletEnabled,
  username,
  accId,
  avatarId,
  accessCode,
  setTokenReward,
  serverVerified,
  setServerVerified,
  messageVerified,
  setMessageVerified,
  chainId,
  addedToMetamask,
  setAddedToMetamask,
  contributorDetected,
  setContributorDetected,
  currentAccount, //eth address
  contributorError,
  setContributorError,
  registrationSuccess,
  setRegistrationSuccess,
  currentPage,
  setCurrentPage,
  loading,
  setLoading,
  txnHash,
  setTxnHash
) {
  if (currentPage == 1) {
    return (
      <div>
        {console.log("ccc ", chainId)}
        {isWalletEnabled && chainId != "0x89" && (
          <div>
            <p style={{ textAlign: "center" }}>
              Chain Unsupported!<br></br>
              We use Polygon/Matic chain as its much chepar to use compared to the Ethereum mainnet.
            </p>
            <br></br>
            <Button onClick={() => pagesUtils.switchChain()}>Switch to Polygon</Button>
          </div>
        )}
        <br></br>
        {isWalletEnabled && chainId == "0x89" && username && (
          <div>Just by verifying discord you got yourself some free SHN. You can redeem them at the end. Please, continue with the next steps.</div>
        ) //if wallet connected and user identified
        }

        {isWalletEnabled &&
        chainId == "0x89" &&
        !username && ( //if wallet connected but no user verified
            <div>
              <div>
                <h2 style={{ textAlign: "center" }}>Your Discord Account</h2>
                <br></br>
                <p style={{ width: 900, textAlign: "left" }}>
                  We need to pair your ETH address with your Discord account, so we can create an identity for you. This will enable contribution tracking and reward distribution
                  process. Just by being active in the discord, you will earn some SHN tokens on weekly basis.
                </p>
              </div>
              <br></br>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Button onClick={() => window.open(authorizeAccountLink, "_self")}>VERIFY DISCORD</Button>
              </div>
            </div>
          )}

        {!isWalletEnabled && (
          <div style={{ textAlign: "center" }}>
            {accessCode ? (
              <div> "Welcome back, please connect your wallet again" </div>
            ) : (
              <div>
                <h2 style={{ textAlign: "center" }}>Become a contributor</h2>
                <br></br>

                <p style={{ width: 900 }}>
                  In this onboarding process we are going to set up your contributor profile, so that you can start earning SHN automatically. We will introduce you to our tool
                  stack and share recourses that will allow you to understand how you can <b>get involved regardless of your background, skill level, or availability.</b>
                  <br></br>
                  <br></br> If you’re successful in completing all of the steps, you’ll earn your first 500 SHN 🌟
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    );
  } else if (currentPage == 2) {
    return (
      <div>
        {!serverVerified ? (
          <div>
            <div>
              <h2 style={{ textAlign: "center" }}>Join ShineDAO Discord</h2>
              <br></br>
              <p>
                If you haven’t yet, join our Discord server. This is our main communication tool. Once you read through <b>#🏁start-here channel</b>, please verify.
                <br></br>
                <br></br>
                If you’re in the server already, you can just press verify.
              </p>
              <br></br>
              <br></br>
              <br></br>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button style={{ marginRight: 15 }} onClick={() => window.open(inviteLink, "_blank")}>
                JOIN DISCORD
              </Button>
              <Button style={{ marginLeft: 15 }} onClick={() => pagesUtils.verifyServer(accessCode, setTokenReward, setServerVerified)}>
                VERIFY
              </Button>
            </div>
          </div>
        ) : (
          <p>Hoooray!!! You just won some more SHN. Please continue with the next steps.</p>
        )}

        <br></br>
        <br></br>
      </div>
    );
  } else if (currentPage == 3) {
    return (
      <div>
        {(typeof messageVerified == "undefined" || messageVerified === false) && ( //type is undefined if request hasn't been sent. This is needed to handle the case of unsuccessful verification.
          <div>
            <h2 style={{ textAlign: "center" }}>Introduce Yourself</h2>
            <br></br>
            <div>
              Its time to introduce yourself in the
              <a href={introductionsChannel} target="_blank">
                #introductions channel
              </a>
              . When you introduce yourself in the channel, come back to this page and click verify.
              <br></br>
              <br></br>
              <div style={{ width: 900, textAlign: "left", margin: "0 auto" }}>
                <b>Please add the following info:</b>
                <br></br>
                <b>- Motivation:</b> What brings you here?
                <br></br>
                <b>- Experience:</b> (Content / Marketing / Core Contracts / Frontend/ Partnerships / UX ,...)
                <br></br>
                <b>- Specific Skills:</b> (Copywriting, Podcasting, Java, JS, HTML, CSS, Python, Solidity, ... )<br></br>
                <b>- Where do you see yourself contributing: </b> (Product and Tech Guild / Growth Guild / Hunting Guild / Infrastructure Guild )<br></br>
                <b>- Bandwidth:</b> (~10 hours / week). We'd also suggest joining our weekly community call every Monday 5:30 pm UTC.
              </div>
              <br></br> <br></br>
              <div style={{ textAlign: "center" }}>
                <h4> Here are ShineDAO's intro resources if you need more information:</h4>
                <br></br>
                To be able to understand what how ShineDAO works please read our documentation
                <a href="https://docs.shinedao.finance/" target="_blank">
                  https://docs.shinedao.finance/
                </a>
                <br></br>
                To be able to understand how to get involved please check out our notion board
                <a href="https://oasis-firefly-683.notion.site/ShineDAO-23d023e521934cca9d835be9f73790d7" target="_blank">
                  https://oasis-firefly-683.notion.site/ShineDAO-23d023e521934cca9d835be9f73790d7
                </a>
              </div>
              <br></br>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button onClick={() => pagesUtils.verifyMessage(accessCode, setTokenReward, setMessageVerified)}>VERIFY </Button>
            </div>
          </div>
        )}
        {console.log("messageVerified", messageVerified)}
        {console.log("type of message", typeof messageVerified)}
        {console.log("type of messag1e", typeof messageVerified === "undefined")}
        {messageVerified === false && (
          <div>
            {" "}
            <br></br>
            <p style={{ textAlign: "center" }}>We could not detect your post. Please try again or post a message on discord by asking for help. </p>
          </div>
        )}
        {messageVerified === true && (
          <div>
            <div>
              {!addedToMetamask && (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <p>Before you can claim your tokens, lets add the tokens to Metamask.</p>

                  <Button
                    style={{ width: "200px" }}
                    onClick={() =>
                      pagesUtils.addToWatchlist(setAddedToMetamask, currentPage, setCurrentPage, setTokenReward, {
                        address: "0x53D76f967De13E7F95e90196438DCe695eCFA957",
                        symbol: "SHN",
                        decimals: 18,
                        image: "https://i.ibb.co/mRKYzwB/shine-logo-256.png",
                      })
                    }
                  >
                    Add SHN to Metamask{" "}
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}

        <br></br>
        <br></br>
        <br></br>
        <br></br>
      </div>
    );
  } else if ((currentPage = 4)) {
    return (
      <div>
        {addedToMetamask && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div>
              <p style={{ textAlign: "center" }}>
                Nice job! You are almost there! <br></br> After claiming your reward, you will be an official ShineDAO's contributor. The reward will be airdropped to your address
                on Polygon/Matic chain in few minutes.
              </p>
            </div>
            <div>
              {registrationSuccess !== true && !loading && (
                <Button
                  style={{ width: "200px" }}
                  onClick={() =>
                    pagesUtils.claimReward(
                      accessCode,
                      setContributorDetected,
                      currentAccount,
                      username,
                      accId,
                      avatarId,
                      setContributorError,
                      setRegistrationSuccess,
                      setLoading,
                      setTxnHash
                    )
                  }
                >
                  Claim your SHN tokens{" "}
                </Button>
              )}
              <br></br>
              <div style={{ marginTop: 20, display: "flex", flexDirection: "column", alignItems: "center" }}>
                {" "}
                <PulseLoader style={{}} color={"#3f3d56"} loading={loading} size={15} margin={2} />
                {loading && (
                  <p style={{ textAlign: "center" }}>
                    <br></br>This may take few minutes. Please don't close the screen.
                  </p>
                )}
              </div>
            </div>
            <br></br>
            <br></br>
            {contributorDetected && !loading && (
              <p style={{ textAlign: "center" }}>It seems you are already a contributor. Only people who are not contributors can become contributors.</p>
            )}

            {contributorError === true && <p style={{ textAlign: "center" }}>Something went wrong. Plese try again later.</p>}

            {registrationSuccess === true && <p style={{ textAlign: "center" }}>Congrats! Your tokens are on the way!</p>}
            {txnHash && (
              <p style={{ textAlign: "center" }}>
                Transaction hash:{" "}
                <a target="_blank" href={`https://polygonscan.com/tx/${txnHash}`}>
                  {txnHash}
                </a>
              </p>
            )}
          </div>
        )}
      </div>
    );
  }
}
