import React from 'react';

import { ThemeProvider } from '@emotion/react';
import i18next from 'i18next';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RouterProvider } from 'react-router-dom';

import {
  useAppSelector,
  useAppRoutes,
  useAppDispatch,
  useGetQuerySearch,
} from '@/hooks';
import { routes } from '@/modules/routes';
import getBrandingService from '@/state/ui/getBrandingService';
import getTheme from '@/theme';
import FontSetup from '@/theme/GlobalStyles/FontsSetup';
import GlobalStyles from '@/theme/GlobalStyles/GlobalStyles';

import '@/locales';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

export function AppSetup() {
  const dispatch = useAppDispatch();

  const { t } = useTranslation('app');
  const params = useGetQuerySearch();
  const language = useAppSelector((state) => state.ui.language);
  const brandingDetails = useAppSelector((state) => state.ui.brandingDetails);

  React.useEffect(() => {
    i18next.changeLanguage(language);
  }, [language]);

  React.useEffect(() => {
    dispatch(
      getBrandingService({
        config: {
          params: { storeAttribute: params.hostname },
        },
      }),
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const router = useAppRoutes({ routes });

  return (
    <HelmetProvider>
      <ThemeProvider
        theme={{ ...getTheme('light'), branding: brandingDetails }}
      >
        <Helmet
          title={t('titleTab')}
          htmlAttributes={{
            lang: language,
            dir: language === 'en' ? 'ltr' : 'rtl',
          }}
          bodyAttributes={{
            lang: language,
            dir: language === 'en' ? 'ltr' : 'rtl',
          }}
        >
          <meta name="description" content={t('metaDescription')} />
          {process.env.NODE_ENV !== 'production' && (
            <>
              <meta name="googlebot" content="noindex" />
              <meta name="robots" content="noindex, nofollow" />
              <meta name="bingbot" content="noindex" />
            </>
          )}
        </Helmet>
        <FontSetup />
        <GlobalStyles />
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}
