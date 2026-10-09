import Script from "next/script";

/**
 * Third-party and custom tracking scripts ported 1:1 from the Framer site's
 * custom code (head + end of body). Order and attributes are preserved.
 */
export function Analytics() {
  return (
    <>
      {/* Hyros universal script */}
      <Script id="hyros" strategy="afterInteractive">{`
var head = document.head;
var script = document.createElement('script');
script.type = 'text/javascript';
script.src = "https://hy.themochi.app/v1/lst/universal-script?ph=0444a424826f70ada1209a49577cb626d62980905a60cb89756a148d2f302a15&tag=!clicked&ref_url=" + encodeURI(document.URL) ;
head.appendChild(script);
      `}</Script>

      {/* Dub analytics */}
      <Script
        src="https://www.dubcdn.com/analytics/script.js"
        strategy="afterInteractive"
        data-publishable-key="dub_pk_TfrAEky0M9veWeGyZ0Hzv3Zl"
      />

      {/* Mochi tracking pixel */}
      <Script
        src="https://t.themochi.app/pixel.js"
        strategy="afterInteractive"
        data-id="org_9efcd4e7-7712-4fcf-8642-83c4546f2c69"
      />

      {/* Meta Pixel */}
      <Script id="meta-pixel" strategy="afterInteractive">{`
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '1426446855784447');
fbq('track', 'PageView');
      `}</Script>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          alt=""
          src="https://www.facebook.com/tr?id=1426446855784447&ev=PageView&noscript=1"
        />
      </noscript>

      {/* Mochi attribution hub */}
      <Script src="https://track.themochi.app/api/hub/v1/cmq2omlm9001zif04s3ntk88q" strategy="afterInteractive" />

      {/* PostHog */}
      <Script id="posthog" strategy="afterInteractive">{`
!function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="init capture register register_once register_for_session unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled getFeatureFlag getFeatureFlagPayload reloadFeatureFlags group identify setPersonProperties setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags resetGroups onFeatureFlags addFeatureFlagsHandler onSessionId getSurveys getActiveMatchingSurveys renderSurvey canRenderSurvey getNextSurveyStep".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
posthog.init('phc_uymigoyH9fL3TyUmPxMLfsRLYT6nhLtre39tBFWiCjGN', {
    api_host: 'https://us.i.posthog.com',
    person_profiles: 'identified_only',
    capture_pageview: true,
    capture_pageleave: true,
    autocapture: true,
    session_recording: {
        maskAllInputs: false,
        maskInputOptions: { password: true, email: false }
    },
    loaded: function(posthog) {
        if (window.location.hostname === 'localhost') posthog.opt_out_capturing();
    }
});
      `}</Script>

      {/* Affiliate / UTM capture and GHL link decoration */}
      <Script src="/js/attribution.js" strategy="afterInteractive" />
      {/* First-touch attribution to Mochi backend */}
      <Script src="/js/track-touch.js" strategy="afterInteractive" />
    </>
  );
}
