import { useEffect } from 'react';

/**
 * 
 * @see https://developer.chrome.com/docs/web-platform/prerender-pages
 */
export function useSpeculationRules(urls: string[]) {
  useEffect(() => {
    const rules = {
      prerender: [
        {
          source: "document",
          where: {
            and: [
              { href_matches: "/*" },
              { selector_matches: ".prerender"},
            ],
          },
          eagerness: "moderate"
        }
      ]
    };

    const script = document.createElement('script');
    script.type = 'speculationrules';
    script.textContent = JSON.stringify(rules);
    console.log('rules', rules);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [urls]);
}
