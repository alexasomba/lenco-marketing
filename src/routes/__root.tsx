import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import { RootProvider } from 'fumadocs-ui/provider/tanstack';
import Intercom from '@intercom/messenger-js-sdk';
import { useEffect } from 'react';

import LencoHeader from '../components/LencoHeader'
import LencoFooter from '../components/LencoFooter'

import appCss from '../styles.css?url'

// Environment variable for Intercom (defaults to empty to disable if not set)
const INTERCOM_APP_ID = import.meta.env.VITE_INTERCOM_APP_ID || '';

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'Lenco - All-in-one finance built for Sole traders',
      },
      {
        name: 'description',
        content: 'Lenco provides business bank accounts, payments, and expense management for startups, sole traders, SMBs and freelancers in Nigeria.',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),

  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Initialize Intercom only if app ID is configured
    if (INTERCOM_APP_ID) {
      Intercom({
        app_id: INTERCOM_APP_ID,
      });
    }
  }, []);

  const isDev = import.meta.env.DEV;

  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="antialiased">
        <RootProvider>
          <LencoHeader />
          {children}
          <LencoFooter />
        </RootProvider>
        {/* Only show devtools in development */}
        {isDev && (
          <TanStackDevtools
            config={{
              position: 'bottom-right',
            }}
            plugins={[
              {
                name: 'Tanstack Router',
                render: <TanStackRouterDevtoolsPanel />,
              },
            ]}
          />
        )}
        <Scripts />
      </body>
    </html>
  )
}
