import React, { useState, useEffect } from "react";
import { useMoralis, useMoralisQuery, useMoralisCloudFunction } from "react-moralis";
import { Button } from "components/common";
import { Article } from "./article";
import { author } from "data/config";

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
  const { data: articles, error, isLoading } = useMoralisQuery("Article");
  const { data: userData, error: userError, isLoading: userisLoading } = useMoralisQuery("User");

  //const { fetch, data:toggleOnboardingData, error: toggleOnboardingError, isLoading:toggleOnboardingDataIsLoading } = useMoralisCloudFunction("toggleOnboarding", { autoFetch: false });

  const { authenticate, isAuthenticated, user } = useMoralis();

  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [serviceError, setServiceError] = useState();
  const [isSubmissionVisible, setSubmissionVisibility] = useState(false);
  const [generalError, setGeneralError] = useState();
  const [generalInfo, setGeneralInfo] = useState();

  //const { fetch: getUserRoles, data: getUserRolesResult, error: getUserRolesError, isLoading: getUserRolesErrorIsLoading } = useMoralisCloudFunction(
   // "getUserRoles",
   // {  },
   // { autoFetch: true }
 // );


  const { fetch: saveArticle, data: saveArticleResult, error: saveArticleError, isLoading: saveArticleIsLoading } = useMoralisCloudFunction(
    "saveArticle",
    { title, url },
    { autoFetch: false }
  );
  useEffect(() => {
    console.log(" here are the articles ", saveArticleResult, typeof(saveArticleResult))
    if(saveArticleResult=="Success"){
      console.log("also called")
      setSubmissionVisibility(false)
      setGeneralInfo("Article submitted successfully!")
    }
  }, [saveArticleResult]);




  const { fetch: getRankedArticles, data: rankedArticles, error: getRankedArticlesError, isLoading: onboardContributorIsLoading } = useMoralisCloudFunction(
    "getRankedArticles",
    {},
    {
      autoFetch: true,
    }
  );

  const { fetch: onboardContributor, data: onboardContributorResponse, error: onboardContributorError, isLoading: rankedArticlesisLoading } = useMoralisCloudFunction(
    "onboardContributor",
    {},
    {
      autoFetch: false,
    }
  );

  const { fetch: getShnWeightedBalance, data: shnWeightedBalance, error: shnWeightedBalanceError, isLoading: shnWeightedIsLoading } = useMoralisCloudFunction(
    "getShnWeightedBalance",
    {},
    {
      autoFetch: false,
    }
  );

  if (error) {
    return <span>🤯</span>;
  }

  if (isLoading) {
    return <span>🙄</span>;
  }

  function handleNavBarSumbit(isAuthenticated, setSubmissionVisibility, setGeneralError) {
    console.log(" hello ", isAuthenticated);
    if (isAuthenticated) {
      setSubmissionVisibility(true);
    } else {
      setGeneralError(
        "Only vaccinated people can submit an article... 😷💉 👀  Nah, we are kidding, you actually have to be contributor. Go to the ShineDAO main page to find out what that is and to complete the onboarding."
      );
    }
  }
  return (
    <div style={{ width: "100%" }}>
      <div style={{ boxShadow: "0px 3px 0px 0px", display: "flex", alignItems: "baseline", background: "rgb(250 218 94)", margin: "0 auto" }}>
        <span>
          <h2 style={{ color: "rgb(54 52 54)", display: "inline", paddingLeft:10 }}>Degen News</h2>
        </span>{" "}
        <span style={{ paddingLeft: 15, paddingRight: 15 }}>|</span>
        <span onClick={() => handleNavBarSumbit(isAuthenticated, setSubmissionVisibility, setGeneralError)}>Submit</span>
        {!isAuthenticated && (
          <div style={{ marginLeft: "auto" }}>
            <Button backgroundHover="#45e25a" onClick={() => authenticate({ signingMessage: "Authenticate with Degen News!" })}>
              Connect Wallet
            </Button>
          </div>
        )}
      </div>

      <div>
        {false && (
          <img
            style={{ height: 190, marginTop: 0, float: "right" }}
            src="https://aws1.discourse-cdn.com/standard21/uploads/shinedao/original/1X/dca391ba2f0d2a5f8487017e7deb6931b46b6288.jpeg"
          ></img>
        )}
        {isAuthenticated && (
          <div>
            <br></br>
            <h3>Welcomee {user.get("username")}, good to see you again!</h3>
          </div>
        )}
        {isSubmissionVisible && (
          <div>
            <label htmlFor="title">Title: </label>
            <input value={title} onChange={e => handleTitleChange(e, setTitle)} type="text" id="title" name="title"></input>
            <br></br>
            <label htmlFor="url">URL: </label>
            <input value={url} onChange={e => handleUrlChange(e, setUrl)} type="text" id="url" name="url"></input>
            <br></br>
            <Button onClick={() => !saveArticleIsLoading && saveArticle()}>Submit</Button>
          </div>
        )}
        {false && <Button onClick={() => getRankedArticles()}>Get Ranked Articles</Button>}
        {false && <Button onClick={() => getShnWeightedBalance()}>Get weighted SHN balance</Button>}
        {false && <Button onClick={() => onboardContributor()}>Onboard Contributor</Button>}
        {generalError && ` ${generalError}`}
        {generalInfo && <div> {generalInfo}<br></br></div>}

        {saveArticleError && `Error: ${saveArticleError}`}
        {serviceError && <div style={{color:"tomato"}}> {serviceError}</div>}
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
              return (
                <Article
                  setServiceError={setServiceError}
                  totalScore={article.totalScore}
                  key={`key-${index}`}
                  author={article.author}
                  url={article.url}
                  createdAt={article.createdAt}
                  articleId={article.articleId}
                  title={article.title}
                  domain={article.domain}
                ></Article>
              );
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
