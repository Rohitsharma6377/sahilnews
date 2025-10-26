export function Analytics() {
  const ga = process.env.NEXT_PUBLIC_GA_ID
  const plausible = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN
  return (
    <>
      {ga && (
        <>
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${ga}`}
          ></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${ga}');`,
            }}
          />
        </>
      )}
      {plausible && (
        <script
          defer
          data-domain={plausible}
          src="https://plausible.io/js/script.js"
        ></script>
      )}
    </>
  )
}
