import React, { useContext, useEffect } from "react";
import { ThemeContext } from "providers/ThemeProvider";
import { useMoralisCloudFunction } from "react-moralis";
import upVote from "assets/illustrations/upVote.png";
import { SmallText } from "components/common";
import PulseLoader from "react-spinners/PulseLoader";

import { Link } from "components/common";

async function handleVote(articleId, submitVote, setServiceError, getRankedArticles) {
  console.log("article id ", articleId);
  submitVote(articleId) // not sure if articleId param needs to be passed or it is already passed?
    .then(result => {
      console.log("result from voting", result);
      getRankedArticles();
    })
    .catch(e => {
      console.log("error while voting", e);

      setServiceError(e);
    });
}

async function handleDeletionOfArticle(deleteArticle, getRankedArticles) {
  if (confirm("Are you sure that you want to delete the article")) {
    await deleteArticle();
    console.log("deleted");
    getRankedArticles();
  }
}

export function Article({ title, domain, articleId, url, userVotedAlready, createdAt, author, totalScore, setServiceError, getRankedArticles, userRoles, index }) {
  const { theme } = useContext(ThemeContext);

  const { fetch: submitVote, data: voteSubmittedResult, error: voteSubmitError, isLoading: voteSubmitIsLoading } = useMoralisCloudFunction(
    "voteOnArticle",
    { articleId },
    { autoFetch: false }
  );

  const { fetch: deleteArticle, data: deleteArticleResult, error: deleteArticleError, isLoading: deleteArticleIsLoading } = useMoralisCloudFunction(
    "deleteArticle",
    { articleId },
    {
      autoFetch: false,
    }
  );

  useEffect(() => {
    if (voteSubmitError && voteSubmitError.message == "Validation failed. Please login to continue.") {
      setServiceError("Only authenticated users can upvote. Please try to connect your wallet");
    } else if (voteSubmitError && voteSubmitError.message == "User already voted") {
      setServiceError("You already voted");
    } else if (voteSubmitError) {
      voteSubmitError && setServiceError(voteSubmitError.message);
    }
  }, [voteSubmitError]);

  let hoursAgo = (new Date().getTime() - new Date(createdAt).getTime()) / 1000 / 60 / 60;

  return (
    <div style={{ paddingLeft: 10 }}>
      <div style={{ fontWeight: "bold" }}>
      <h4 style={{ display: "inline-block", marginRight: 5, color: "#a2a2a2"  }}>{index+1}. </h4>

        {!userVotedAlready && (
          <div style={{ display: "inline-block" }}>
            <PulseLoader style={{}} color={"#3f3d56"} loading={voteSubmitIsLoading} size={3} margin={2} />
            <img style={{ cursor: "pointer", height: 13, marginRight: 3 }} onClick={() => handleVote(articleId, submitVote, setServiceError, getRankedArticles)} src={upVote}></img>
          </div>
        )}
        <Link href={url}>{title} </Link>
        <span style={{ fontWeight: "normal", fontSize: "small", color: "#a2a2a2" }}>({domain}) </span>
      </div>
      <SmallText theme={theme}>
        <span style={{ fontWeight: "normal" }}>{parseInt(totalScore)} points </span> <span>by</span> <span style={{ fontWeight: "normal" }}> {author},</span>{" "}
        <span> submitted {Number.parseFloat(hoursAgo).toFixed(2)} hours ago </span>
        {userRoles && userRoles.includes("Moderator") && (
          <span onClick={() => handleDeletionOfArticle(deleteArticle, getRankedArticles)} style={{ fontWeight: "bold", cursor: "pointer" }}>
            Delete
          </span>
        )}
      </SmallText>
    </div>
  );
}

export default function dummy() {
  return <></>;
}
