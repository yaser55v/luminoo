import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LanguageState {
  currentLanguage: string;
  direction: 'ltr' | 'rtl';
}

const initialState: LanguageState = {
  currentLanguage: 'en',
  direction: 'ltr',
};

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<string>) => {
      state.currentLanguage = action.payload;
      state.direction = action.payload === 'ar' ? 'rtl' : 'ltr';
    },
  },
});

export const { setLanguage } = languageSlice.actions;
export default languageSlice.reducer;