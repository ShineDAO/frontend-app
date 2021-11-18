import React from "react";
import Helmet from "react-helmet";
import Thumbnail from "assets/thumbnail/shine_thumbnail.png";
import DegenNews from "assets/illustrations/degen_news.png";
import OGDegenNews from "assets/illustrations/og_degen_news.png";

import { url, defaultDescription, social, defaultTitle, socialLinks, address, contact, legalName, foundingDate, logo } from "data/config";

export const SEO = ({ title = defaultTitle, description = defaultDescription, location = "", useDegenNews = false }) => {
  const structuredDataOrganization = `{ 
		"@context": "http://schema.org",
		"@type": "Organization",
		"legalName": "${legalName}",
		"url": "${url}",
		"logo": "${logo}",
		"foundingDate": "${foundingDate}",
		"founders": [{
			"@type": "Person",
			"name": "${legalName}"
		}],
		"contactPoint": [{
			"@type": "ContactPoint",
			"email": "${contact.email}",
			"telephone": "${contact.phone}",
			"contactType": "customer service"
		}],
		"address": {
			"@type": "PostalAddress",
			"addressLocality": "${address.city}",
			"addressRegion": "${address.region}",
			"addressCountry": "${address.country}",
			"postalCode": "${address.zipCode}"
		},
		"sameAs": [
			"${socialLinks.twitter}",
			"${socialLinks.google}",
			"${socialLinks.youtube}",
			"${socialLinks.linkedin}",
			"${socialLinks.instagram}",
			"${socialLinks.github}"
		]
  	}`;

  return (
    <Helmet>
      <meta name="description" content={description} />
      <meta name="image" content={useDegenNews ? OGDegenNews : Thumbnail} />

      <meta property="og:url" content={`${url}${location}/`} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={useDegenNews ? OGDegenNews : Thumbnail} />
      <meta property="fb:app_id" content={social.facebook} />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:creator" content={socialLinks.twitter} />
      <meta name="twitter:site" content={social.twitter} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={useDegenNews ? `https://shinedao.finance` + DegenNews : `https://shinedao.finance` + Thumbnail} />
      <meta name="twitter:image:src" content={useDegenNews ? `https://shinedao.finance` + DegenNews : `https://shinedao.finance` + Thumbnail} />
      <script type="application/ld+json">{structuredDataOrganization}</script>
      <link rel="publisher" href={socialLinks.google} />
      <title>{title}</title>
      <html lang="en" dir="ltr" />
    </Helmet>
  );
};
