/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import i18n from 'i18next';

import { UIState } from '../types';

import getBrandingService from './getBrandingService';

import { LayoutType } from '@/layout/layout.types';

const initialState: UIState = {
  mode: 'light',
  language: 'ar',
  layout: 'normal',
  headerVariant: 'transparent',
  brandingDetails: {
    isEnabled: false,
    logo: {},
  },
};

const slice = createSlice({
  name: 'app/ui',
  initialState,
  reducers: {
    changeThemeMode(state, action: PayloadAction<'dark' | 'light'>) {
      return { ...state, mode: action.payload };
    },
    changeLayout(state, action: PayloadAction<LayoutType>) {
      return { ...state, layout: action.payload };
    },
    changeHeaderVariant(state, action: PayloadAction<'transparent' | 'white'>) {
      return { ...state, headerVariant: action.payload };
    },
    toggleLanguage(state, action: PayloadAction<'ar' | 'en'>) {
      i18n.changeLanguage(action.payload);
      return { ...state, language: action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        getBrandingService.fulfilled,
        (state: UIState, action: PayloadAction<any>) => {
          const { records } = action.payload;
          const brandingDetails = {
            isEnabled: records.has_brandind_feature ?? false,
            primaryColor: records.branding_data.primary_color,
            secondaryColor: records.branding_data.secondary_color,
            backgroundImage: `https://dev-yamm-be-bucket.s3.ap-south-1.amazonaws.com/${records.branding_data.background}`,
            backgroundColor: records.branding_data.background_color,
            logo: {
              image: records.logo,
              url: records.website_url,
            },
          };

          if (records.has_brandind_feature) {
            state.brandingDetails = brandingDetails;
          } else {
            state.brandingDetails = {
              ...initialState.brandingDetails,
              logo: {
                image: records.logo,
                url: records.website_url,
              },
            };
          }
        },
      )
      .addCase(getBrandingService.rejected, (state: UIState) => {
        state.brandingDetails = initialState.brandingDetails;
      });
  },
});

export const {
  changeThemeMode,
  toggleLanguage,
  changeHeaderVariant,
  changeLayout,
} = slice.actions;

export default slice.reducer;
