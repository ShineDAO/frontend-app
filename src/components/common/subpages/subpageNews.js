import React, { useState, useEffect } from "react";
import { useMoralis, useMoralisQuery, useMoralisCloudFunction } from "react-moralis";
import { Button, Text, DegenNewsTitle, DegenNewsTitleContainer} from "components/common";
import { Article } from "./article";
import PulseLoader from "react-spinners/PulseLoader";
import { HorizontalRuler } from "components/common/HorizontalRuler";

import { loadWeb3MoralisProviderLight } from "../../../utils/pagesUtils";

function handleTitleChange(e, setTitle) {
  setTitle(e.target.value);
}

function handleUrlChange(e, setUrl) {
  setUrl(e.target.value);
}

function compare(a, b) {
  return b.totalScore - a.totalScore;
}

export function SubpageNews() {
  const { Moralis } = useMoralis();
  const { authenticate, isAuthenticated, user } = useMoralis();
  const { data: articles, error, isLoading } = useMoralisQuery("Article");
  const { data: userData, error: userError, isLoading: userisLoading } = useMoralisQuery("User");

  //const { fetch, data:toggleOnboardingData, error: toggleOnboardingError, isLoading:toggleOnboardingDataIsLoading } = useMoralisCloudFunction("toggleOnboarding", { autoFetch: false });

  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [serviceError, setServiceError] = useState();
  const [isSubmissionVisible, setSubmissionVisibility] = useState(false);
  const [generalError, setGeneralError] = useState();
  const [generalInfo, setGeneralInfo] = useState();
  const [ethAddress, setEthAddress] = useState();

  //const { fetch: getUserRoles, data: getUserRolesResult, error: getUserRolesError, isLoading: getUserRolesErrorIsLoading } = useMoralisCloudFunction(
  // "getUserRoles",
  // {  },
  // { autoFetch: true }
  // );

  const { fetch: saveArticle, data: saveArticleResult, error: saveArticleError, isLoading: saveArticleIsLoading } = useMoralisCloudFunction("saveArticle", { title, url }, { autoFetch: false });

  const { fetch: onboardPreviousDataIfOldUser, data: onboardPreviousDataIfOldUserResult, error: onboardPreviousDataIfOldUserError, isLoading: onboardPreviousDataIfOldUserIsLoading } = useMoralisCloudFunction(
    "onboardPreviousDataIfOldUser",
    { ethAddress },
    { autoFetch: false }
  );

  useEffect(() => {
    console.log("user 3213", user);
    if (user !== null) {
      let address = user.get("ethAddress");

      console.log(" user data 321 ", address);
      getRankedArticles();
      setEthAddress(address);
    }
  }, [user]);

  useEffect(() => {
    console.log(" is authenticated ", isAuthenticated);
  }, [isAuthenticated]);

  useEffect(() => {
    if (typeof ethAddress !== "undefined") {
      console.log("eth address data ", ethAddress);
      onboardPreviousDataIfOldUser();
    }
  }, [ethAddress]);

  const { fetch: getRankedArticles, data: rankedArticles, error: getRankedArticlesError, isLoading: onboardContributorIsLoading } = useMoralisCloudFunction(
    "getRankedArticles",
    {},
    {
      autoFetch: true,
    }
  );

  useEffect(() => {
    console.log(" here are the articles ", saveArticleResult, typeof saveArticleResult);
    if (saveArticleResult == "Success") {
      console.log("also called");
      setSubmissionVisibility(false);
      setGeneralInfo("Article submitted successfully!");
      setTitle("");
      setUrl("");
      getRankedArticles();
      window.location.reload(true); // reload the page because there is a bug with multiple submissions
    }
  }, [saveArticleResult]);

  const { fetch: onboardContributor, data: onboardContributorResponse, error: onboardContributorError, isLoading: rankedArticlesisLoading } = useMoralisCloudFunction(
    "onboardContributor",
    {},
    {
      autoFetch: false,
    }
  );

  const { fetch: getShnPrice, data: shnPriceData, error: shnPriceError, isLoading: shnPriceIsLoading } = useMoralisCloudFunction(
    "getShnPrice",
    {},
    {
      autoFetch: true,
    }
  );

  useEffect(() => {
    shnPriceData && console.log("data ", shnPriceData);
  }, [shnPriceData]);

  const { fetch: getShnWeightedBalance, data: shnWeightedBalance, error: shnWeightedBalanceError, isLoading: shnWeightedIsLoading } = useMoralisCloudFunction(
    "getShnWeightedBalance",
    {},
    {
      autoFetch: false,
    }
  );

  const { fetch: getUserRoles, data: userRoles, error: getUserRolesError, isLoading: getUserRolesIsLoading } = useMoralisCloudFunction(
    "getUserRoles",
    {},
    {
      autoFetch: true,
    }
  );

  useEffect(() => {
    console.log("user roles ", userRoles);
  }, [userRoles]);

  useEffect(() => {
    console.log("isSaveArticleLoading", saveArticleIsLoading);
    if (saveArticleIsLoading) {
      setSubmissionVisibility(false);
    }
  }, [saveArticleIsLoading]);

  if (error) {
    return <span>🤯 Oops, there has been some error. Please hard refresh the page to clean the storage. (Mac users: Hold down Shift and click the Reload button. Windows users: hold down Ctrl and then press F5) </span>;
  }

  if (isLoading) {
    return <span>🙄 loading...</span>;
  }

  function handleNavBarSumbit(isAuthenticated, setSubmissionVisibility, setGeneralError) {
    console.log(" hello ", isAuthenticated);
    if (isAuthenticated) {
      setSubmissionVisibility(true);
    } else {
      setGeneralError("Please connect your wallet in order to be able to post");
    }

    if (isSubmissionVisible) {
      setGeneralInfo();
      setSubmissionVisibility(!isSubmissionVisible);
    }
  }

  async function handleLogout() {
    await Moralis.User.logOut();
    window.location.reload(true);
  }
  function substringAddress(address) {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  }
  return (
    <div style={{ width: "100%", fontFamily:"Roboto" }}>
      <div style={{ display: "flex", alignItems: "center", background: "rgb(250 218 94)", margin: "0 auto" }}>
        <DegenNewsTitleContainer>
          <DegenNewsTitle>Degen News</DegenNewsTitle>
        </DegenNewsTitleContainer>{" "}
        <span style={{ paddingLeft: 10, paddingRight: 10, color:"#000000"  }}>|</span>
        <span style={{ cursor: "pointer", color:"#000000" }} onClick={() => handleNavBarSumbit(isAuthenticated, setSubmissionVisibility, setGeneralError)}>
          Submit
        </span>
        <span style={{ paddingLeft: 10, paddingRight: 10, color:"#000000" }}>|</span>
        <span style={{ cursor: "pointer", color:"#000000"  }} onClick={() => window.open("https://docs.shinedao.finance/community/degen-news", "_self")}>
          FAQ
        </span>
        {!isAuthenticated ? (
          <div style={{ marginLeft: "auto" }}>
            <Button marginBottom="0px" backgroundHover="#45e25a" onClick={() => loadWeb3MoralisProviderLight(authenticate, Moralis)}>
              Connect Wallet
            </Button>
          </div>
        ) : (
          <span onClick={() => handleLogout()} style={{ marginLeft: "auto", paddingRight: 8, cursor: "pointer",  color:"#000000" }}>
            Log out
          </span>
        )}
      </div>

      <div>
        {false && <img style={{ height: 190, marginTop: 0, float: "right" }} src="https://aws1.discourse-cdn.com/standard21/uploads/shinedao/original/1X/dca391ba2f0d2a5f8487017e7deb6931b46b6288.jpeg"></img>}
        {isAuthenticated && shnPriceData && (
          <div>
            <br></br>
            {console.log("discordId and type", user.get("discordId"), "undefined" == typeof user.get("discordId"), user.get("ethAddress").substring(0, 6))}
            <Text style={{ display: "inline-block" }} color="#ffffff" padding="0px 0px 0px 10px">
              {
                //if user is not onboarded we show his eth address
              }
              Welcome <b>{"undefined" == typeof user.get("discordId") ? substringAddress(user.get("ethAddress")) : user.get("username")}</b> ! Submit your most interesting DeFi news!{" "}
              {"undefined" == typeof user.get("discordId") && (
                <div>
                  NOTE: To set up a proper username and to join the Discord community, please complete the <a href="https://app.shinedao.finance/onboarding">onboarding.</a>
                </div>
              )}
            </Text>
            <Text disableMobileFloat="true" float="right" style={{ display: "inline-block", marginRight: 8 }} color="#ffa547" padding="0px 0px 0px 10px">
              Current SHN price:{" "}
              <a style={{ cursor: "pointer", color: "#6c6c6f" }} onClick={() => window.open("https://info.quickswap.exchange/pair/0xf6467b4178d54251d253ac0095f31444f0f6efbc", "_self")}>
                {" "}
                ${parseFloat(shnPriceData).toFixed(4)}
              </a>
            </Text>
          </div>
        )}
        <PulseLoader style={{}} color={"#3f3d56"} loading={saveArticleIsLoading} size={15} margin={10} />

        {isSubmissionVisible && (
          <div style={{ paddingLeft: 5 }}>
            <label htmlFor="title">Title: </label>
            <input style={{ width: 260 }} value={title} onChange={e => handleTitleChange(e, setTitle)} type="text" id="title" name="title"></input>
            <br></br>
            <label htmlFor="url">URL: </label>
            <input style={{ width: 260 }} value={url} onChange={e => handleUrlChange(e, setUrl)} type="text" id="url" name="url"></input>
            <br></br>
            <Button onClick={() => !saveArticleIsLoading && saveArticle()}>Submit</Button>
          </div>
        )}
        {false && <Button onClick={() => getRankedArticles()}>Get Ranked Articles</Button>}
        {false && <Button onClick={() => getShnWeightedBalance()}>Get weighted SHN balance</Button>}
        {false && <Button onClick={() => onboardContributor()}>Onboard Contributor</Button>}
        {generalError && ` ${generalError}`}
        {generalInfo && (
          <div style={{ paddingLeft: 10 }}>
            {" "}
            {generalInfo}
            <br></br>
          </div>
        )}

        {saveArticleError && <div style={{ paddingLeft: 10, color: "tomato" }}> Error: {saveArticleError.message} </div>}
        {serviceError && <div> {serviceError}</div>}
        {shnWeightedBalance &&
          shnWeightedBalance.length > 0 &&
          shnWeightedBalance.map(item => {
            return (
              <div>
                Symbol: {item.symbol} {item.balance}
              </div>
            );
          })}
        <br></br>
        <div style={{ width: "100%" }}>
          {false && rankedArticles && console.log("ranked and sorted articles ", [...rankedArticles].sort(compare))}
          {rankedArticles &&
            rankedArticles.length != 0 &&
            [...rankedArticles].sort(compare).map((article, index) => {
              if (index == 3) {
                return (
                  <div>
                    <i><Text color="tomato" style={{float:"right", paddingRight:10, paddingLeft:10, paddingBottom:10}}>If your article gets ranked in the top 3, you get rewarded with $SHN tokens</Text></i>
                    <HorizontalRuler marginBottom="5px" opacity="83%" height="3px" width="99%" color="red"></HorizontalRuler>
                  </div>
                );
              } else {
                return (
                  <Article
                    getRankedArticles={getRankedArticles}
                    setServiceError={setServiceError}
                    totalScore={article.totalScore}
                    key={`key-${index}`}
                    index={index}
                    author={article.author}
                    url={article.url}
                    createdAt={article.createdAt}
                    articleId={article.articleId}
                    title={article.title}
                    domain={article.domain}
                    userVotedAlready={article.userVotedAlready}
                    userRoles={userRoles}
                  ></Article>
                );
              }
            })}
        </div>
      </div>
      {console.log("type of articles", articles.length)}
      {false &&
        articles.length != 0 &&
        articles.map((article, index) => {
          console.log("single article ", article);
          return <Article key={`key-${index}`} title={article.attributes.title} url={article.attributes.url}></Article>;
        })}
      {}
      {false && <pre>{JSON.stringify(rankedArticles, null, 2)}</pre>}
      {false && <pre>{JSON.stringify(shnWeightedBalance, null, 2)}</pre>}
      {false && <pre>{JSON.stringify(articles, null, 2)}</pre>}
      {false && <pre>{JSON.stringify(userData, null, 2)}</pre>}
    </div>
  );
}
