import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* meta begin */}
          <meta charSet="UTF-8" />
          <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
          {/* meta end */}

          {/* public assets begin */}
          <link rel="stylesheet" href="/css/plugins/bootstrap-grid.css" />
          <link rel="stylesheet" href="/css/plugins/font-awesome.min.css" />
          <link rel="stylesheet" href="/css/plugins/swiper.min.css" />
          <link rel="stylesheet" href="/css/plugins/magnific-popup.css" /> 
          <script type="module" src="https://cookieconsent.popupsmart.com/js/CookieConsent.js" ></script>
          <script type="text/javascript" src="https://cookieconsent.popupsmart.com/js/App.js"></script>
          <script>
              popupsmartCookieConsentPopup({
                  "siteName" : "WebVortex" ,
                  "notice_banner_type": "simple-dialog",
                  "consent_type": "gdpr",
                  "palette": "light",
                  "language": "Greek",
                  "privacy_policy_url" : "/policy" ,
                  "preferencesId" : "#" ,
                  "companyLogoURL" : "https://d2r80wdbkwti6l.cloudfront.net/heV2hHOR3rHM72jJEPVNBRfjXzxRCheZ.jpg"
              });
          </script> 
          {/* public assets end */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
