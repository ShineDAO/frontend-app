import React, { useState, useEffect } from "react";
import { useMoralisCloudFunction } from "react-moralis";
import upVote from "assets/illustrations/upVote.png";

import { Link } from "components/common";

async function handleVote(articleId, submitVote, setServiceError, getRankedArticles) {
  console.log("article id ", articleId);
  submitVote(articleId)
    .then(result => {
      console.log("result from voting", result);
      getRankedArticles();
    })
    .catch(e => {
      console.log("error while voting", e);

      setServiceError(e);
    });
}

export function Article({ title, domain, articleId, url, userVotedAlready, createdAt, author, totalScore, setServiceError, getRankedArticles }) {
  const { fetch: submitVote, data: voteSubmittedResult, error: voteSubmitError, isLoading: voteSubmitIsLoading } = useMoralisCloudFunction(
    "voteOnArticle",
    { articleId },
    { autoFetch: false }
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
        {!userVotedAlready && (
          <img style={{ cursor: "pointer", height: 18, marginRight: 5 }} onClick={() => handleVote(articleId, submitVote, setServiceError, getRankedArticles)} src={upVote}></img>
        )}
        <Link href={url}>{title} </Link>
        <span style={{ fontWeight: "normal", fontSize: "small" }}>({domain}) </span>
      </div>
      <div style={{ fontSize: "small", marginBottom: 20 }}>
        <span style={{ fontWeight: "normal" }}>{parseInt(totalScore)} points </span> <span>by</span> <span style={{ fontWeight: "normal" }}> {author},</span>{" "}
        <span> submitted {Number.parseFloat(hoursAgo).toFixed(2)} hours ago </span>
      </div>
    </div>
  );
}

export default function dummy() {
  return <></>;
}
