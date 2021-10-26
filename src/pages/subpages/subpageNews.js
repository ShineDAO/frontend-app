import React, { useState, useEffect } from "react";
import { useMoralis, useMoralisQuery, useMoralisCloudFunction } from "react-moralis";
import { Button } from "components/common";

function handleTitleChange(e, setTitle) {
  setTitle(e.target.value);
}

function handleUrlChange(e, setUrl) {
  setUrl(e.target.value);
}

export function SubpageNews() {
  const { data, error, isLoading } = useMoralisQuery("Articles");
  const { userData, userError, userisLoading } = useMoralisQuery("User");

  const { fetch, toggleOnboardingData, toggleOnboardingError, toggleOnboardingDataIsLoading } = useMoralisCloudFunction("toggleOnboarding", { autoFetch: false });

  const { authenticate, isAuthenticated, user } = useMoralis();

  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  if (error) {
    return <span>🤯</span>;
  }

  if (isLoading) {
    return <span>🙄</span>;
  }

  return (
    <div>
      <label htmlFor="title">Title: </label>
      <input value={title} onChange={e => handleTitleChange(e, setTitle)} type="text" id="title" name="title"></input>
      <br></br>
      <label htmlFor="url">URL: </label>
      <input value={url} onChange={e => handleUrlChange(e, setUrl)} type="text" id="url" name="url"></input>
      <br></br>


      <Button onClick={() => alert("test")}>Submit</Button>
      <Button onClick={() => fetch()}>Fetch manually</Button>

      {!isAuthenticated && (
        <div>
          <button onClick={() => authenticate()}>Authenticate</button>
        </div>
      )}

      {isAuthenticated && (
        <div>
          <h1>Welcomee {user.get("username")}</h1>
        </div>
      )}
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <pre>{JSON.stringify(userData, null, 2)}</pre>
    </div>
  );
}
