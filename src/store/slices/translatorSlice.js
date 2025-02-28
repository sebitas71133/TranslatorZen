import { createSlice } from "@reduxjs/toolkit";

const translatorSlice = createSlice({
  name: "translator",
  initialState: {
    // inputText: "",
    translatedText: "",

    targetLanguage: "Ingles",
    formalityLevel: "Informal",
    variant: "Americano",
    situation: "Redes sociales",
    wordInfo: "",
    examples: [],
    synonyms: [],
    antonyms: [],
    conjugations: {},
    translationType: "word",
    infoType: "Definición",
    darkMode: true,
    questionInput: "",
    answerTone: "neutral",
    generatedAnswer: "",
    favoriteWords: [],
    favoritePhrases: [],
    favoriteAnswers: [],
    isLoading: false,
    isSuccess: false,
    idiomatic: false,
  },
  reducers: {
    setInputText: (state, action) => {
      state.inputText = action.payload;
    },
    setTranslatedText: (state, action) => {
      console.log(action.payload);

      state.translatedText = action.payload;
      state.isSuccess = true;
    },
    setTargetLanguage: (state, action) => {
      state.targetLanguage = action.payload;
    },
    setFormalityLevel: (state, action) => {
      state.formalityLevel = action.payload;
    },
    setVariant: (state, action) => {
      state.variant = action.payload;
    },
    setSituation: (state, action) => {
      state.situation = action.payload;
    },
    setTranslationInfo: (state, action) => {
      state.wordInfo = action.payload.wordInfo || state.wordInfo;
      state.examples = action.payload.examples || state.examples;
      state.synonyms = action.payload.synonyms || state.synonyms;
      state.antonyms = action.payload.antonyms || state.antonyms;
      state.conjugations = action.payload.conjugations || state.conjugations;
    },

    setTranslationType: (state, action) => {
      state.translationType = action.payload;
    },
    setInfoType: (state, action) => {
      state.infoType = action.payload;
    },
    setDarkMode: (state, action) => {
      console.log(action.payload);

      state.darkMode = action.payload;
    },
    setQuestionInput: (state, action) => {
      state.questionInput = action.payload;
    },
    setAnswerTone: (state, action) => {
      state.answerTone = action.payload;
    },
    setGeneratedAnswer: (state, action) => {
      state.generatedAnswer = action.payload;
    },
    addFavoriteWord: (state, action) => {
      if (!state.favoriteWords.includes(action.payload)) {
        state.favoriteWords.push(action.payload);
      }
    },
    addFavoritePhrase: (state, action) => {
      if (!state.favoritePhrases.includes(action.payload)) {
        state.favoritePhrases.push(action.payload);
      }
    },
    addFavoriteAnswer: (state, action) => {
      if (!state.favoriteAnswers.includes(action.payload)) {
        state.favoriteAnswers.push(action.payload);
      }
    },
    removeFavoriteWord: (state, action) => {
      state.favoriteWords = state.favoriteWords.filter(
        (word) => word !== action.payload
      );
    },
    removeFavoritePhrase: (state, action) => {
      state.favoritePhrases = state.favoritePhrases.filter(
        (phrase) => phrase !== action.payload
      );
    },
    removeFavoriteAnswer: (state, action) => {
      state.favoriteAnswers = state.favoriteAnswers.filter(
        (answer) => answer !== action.payload
      );
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setIsSuccess: (state, action) => {
      state.isSuccess = action.payload;
    },
    setUseIdiomatic: (state, action) => {
      state.idiomatic = action.payload;
    },
  },
});

export const translatorReducer = translatorSlice.reducer;
export const {
  addFavoriteAnswer,
  addFavoritePhrase,
  addFavoriteWord,
  removeFavoriteAnswer,
  removeFavoritePhrase,
  removeFavoriteWord,
  setAnswerTone,
  setDarkMode,
  setFormalityLevel,
  setGeneratedAnswer,
  setInfoType,
  setInputText,
  setQuestionInput,
  setTargetLanguage,
  setTranslatedText,
  setTranslationInfo,
  setTranslationType,
  setSituation,
  setVariant,
  setIsLoading,
  setUseIdiomatic,
  setIsSuccess,
} = translatorSlice.actions;
