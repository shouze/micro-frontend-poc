import { useEffect } from "react";

export function useSpeculationRules(urls: string[]) {
    useEffect(() => {
      const rules = {
        prerender: [
          {
            source: 'list',
            urls: urls,
          },
        ],
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