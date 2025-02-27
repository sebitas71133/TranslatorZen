import React, { useState, useMemo } from "react";
import { createStore, configureStore, createSlice } from "@reduxjs/toolkit";
import { Provider, useSelector, useDispatch } from "react-redux";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
  AppBar,
  Toolbar,
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Select,
  MenuItem,
  Paper,
  ToggleButton,
  ToggleButtonGroup,
  List,
  ListItem,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Switch,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
  IconButton,
  Tabs,
  Tab,
  CssBaseline,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteIcon from "@mui/icons-material/Delete";
import TranslateIcon from "@mui/icons-material/Translate";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import StarIcon from "@mui/icons-material/Star";

// Crear un slice para el traductor
const translatorSlice = createSlice({
  name: "translator",
  initialState: {
    inputText: "",
    translatedText: "",
    targetLanguage: "es",
    formalityLevel: "normal",
    wordInfo: "",
    examples: [],
    synonyms: [],
    antonyms: [],
    conjugations: {},
    translationType: "word",
    infoType: "definition",
    darkMode: true,
    questionInput: "",
    answerTone: "neutral",
    generatedAnswer: "",
    favoriteWords: [],
    favoritePhrases: [],
    favoriteAnswers: [],
  },
  reducers: {
    setInputText: (state, action) => {
      state.inputText = action.payload;
    },
    setTranslatedText: (state, action) => {
      state.translatedText = action.payload;
    },
    setTargetLanguage: (state, action) => {
      state.targetLanguage = action.payload;
    },
    setFormalityLevel: (state, action) => {
      state.formalityLevel = action.payload;
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
  },
});

// Crear el store
const store = configureStore({
  reducer: translatorSlice.reducer,
});

// Llamadas API simuladas (reemplazar con llamadas API reales en una aplicación real)
const mockTranslate = async (text, targetLang, formalityLevel, type) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return `Traducción ${
    type === "word" ? "de palabra" : "de frase"
  }: "${text}" al ${targetLang} (Formalidad: ${formalityLevel})`;
};

const mockGetWordInfo = async (word, infoType) => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  switch (infoType) {
    case "definition":
      return `Definición de "${word}": Una definición simulada para fines de demostración.`;
    case "examples":
      return [
        "Ejemplo 1: Uso de la palabra en una frase.",
        "Ejemplo 2: Otro uso de la palabra en contexto.",
        "Ejemplo 3: Un tercer ejemplo de uso.",
      ];
    case "synonyms":
      return ["sinónimo1", "sinónimo2", "sinónimo3"];
    case "antonyms":
      return ["antónimo1", "antónimo2"];
    case "conjugations":
      return {
        presente: [
          "yo hago",
          "tú haces",
          "él/ella hace",
          "nosotros hacemos",
          "vosotros hacéis",
          "ellos/ellas hacen",
        ],
        pasado: [
          "yo hice",
          "tú hiciste",
          "él/ella hizo",
          "nosotros hicimos",
          "vosotros hicisteis",
          "ellos/ellas hicieron",
        ],
        futuro: [
          "yo haré",
          "tú harás",
          "él/ella hará",
          "nosotros haremos",
          "vosotros haréis",
          "ellos/ellas harán",
        ],
      };
    default:
      return "Información no disponible";
  }
};

const mockGenerateAnswer = async (question, tone) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const tonePrefix = {
    positive: "¡Excelente pregunta! ",
    neutral: "En respuesta a su pregunta, ",
    negative: "Lamentablemente, ",
  };
  return `${tonePrefix[tone]}Esta es una respuesta generada automáticamente para la pregunta: "${question}"`;
};

// Crear temas para modo claro y oscuro con nueva paleta cyberpunk
const getTheme = (mode) =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: mode === "dark" ? "#00ffff" : "#ff00ff",
      },
      secondary: {
        main: mode === "dark" ? "#ff00ff" : "#00ffff",
      },
      background: {
        default: mode === "dark" ? "#000000" : "#1a1a2e",
        paper: mode === "dark" ? "#0f0f1a" : "#16213e",
      },
      text: {
        primary: mode === "dark" ? "#00ffff" : "#ff00ff",
        secondary: mode === "dark" ? "#ff00ff" : "#00ffff",
      },
    },
    typography: {
      fontFamily: '"Orbitron", "Roboto", "Helvetica", "Arial", sans-serif',
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 0,
            textTransform: "uppercase",
            fontWeight: "bold",
            border: `2px solid ${mode === "dark" ? "#00ffff" : "#ff00ff"}`,
            "&:hover": {
              backgroundColor: mode === "dark" ? "#00ffff" : "#ff00ff",
              color: mode === "dark" ? "#000000" : "#ffffff",
            },
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: mode === "dark" ? "#00ffff" : "#ff00ff",
              },
              "&:hover fieldset": {
                borderColor: mode === "dark" ? "#ff00ff" : "#00ffff",
              },
              "&.Mui-focused fieldset": {
                borderColor: mode === "dark" ? "#ff00ff" : "#00ffff",
              },
            },
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: mode === "dark" ? "#0f0f1a" : "#16213e",
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor: mode === "dark" ? "#0f0f1a" : "#16213e",
          },
        },
      },
    },
  });

// Componente Navbar
function Navbar({ darkMode, toggleDarkMode }) {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          CyberTranslate 3000
        </Typography>
        <IconButton color="inherit" aria-label="translator">
          <TranslateIcon />
        </IconButton>
        <IconButton color="inherit" aria-label="answer generator">
          <QuestionAnswerIcon />
        </IconButton>
        <IconButton color="inherit" aria-label="favorites">
          <StarIcon />
        </IconButton>
        <IconButton sx={{ ml: 1 }} onClick={toggleDarkMode} color="inherit">
          {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

// Componente principal
const TranslatorApp = () => {
  const dispatch = useDispatch();
  const {
    inputText,
    translatedText,
    targetLanguage,
    formalityLevel,
    wordInfo,
    examples,
    synonyms,
    antonyms,
    conjugations,
    translationType,
    infoType,
    darkMode,
    questionInput,
    answerTone,
    generatedAnswer,
    favoriteWords,
    favoritePhrases,
    favoriteAnswers,
  } = useSelector((state) => state);

  const [favoritesTab, setFavoritesTab] = useState(0);

  const handleTranslate = async () => {
    const result = await mockTranslate(
      inputText,
      targetLanguage,
      formalityLevel,
      translationType
    );
    dispatch(translatorSlice.actions.setTranslatedText(result));

    if (translationType === "word") {
      const info = await mockGetWordInfo(inputText, infoType);
      switch (infoType) {
        case "definition":
          dispatch(translatorSlice.actions.setWordInfo(info));
          break;
        case "examples":
          dispatch(translatorSlice.actions.setExamples(info));
          break;
        case "synonyms":
          dispatch(translatorSlice.actions.setSynonyms(info));
          break;
        case "antonyms":
          dispatch(translatorSlice.actions.setAntonyms(info));
          break;
        case "conjugations":
          dispatch(translatorSlice.actions.setConjugations(info));
          break;
      }
    }
  };

  const handleGenerateAnswer = async () => {
    const answer = await mockGenerateAnswer(questionInput, answerTone);
    dispatch(translatorSlice.actions.setGeneratedAnswer(answer));
  };

  const handleSpeak = (text, lang) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    window.speechSynthesis.speak(utterance);
  };

  const toggleDarkMode = () => {
    dispatch(translatorSlice.actions.setDarkMode(!darkMode));
  };

  const theme = useMemo(
    () => getTheme(darkMode ? "dark" : "light"),
    [darkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <Container maxWidth="md" sx={{ mt: 4, color: "text.primary" }}>
        <Paper
          elevation={3}
          sx={{
            p: 3,
            backgroundColor: "background.paper",
            border: "2px solid",
            borderColor: "primary.main",
            boxShadow: "0 0 20px",
            color: "text.primary",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <ToggleButtonGroup
              value={translationType}
              exclusive
              onChange={(e, newValue) =>
                dispatch(translatorSlice.actions.setTranslationType(newValue))
              }
              aria-label="translation type"
            >
              <ToggleButton value="word" aria-label="word translation">
                Palabra
              </ToggleButton>
              <ToggleButton value="phrase" aria-label="phrase translation">
                Frase
              </ToggleButton>
            </ToggleButtonGroup>

            {translationType === "word" && (
              <Select
                value={infoType}
                onChange={(e) =>
                  dispatch(translatorSlice.actions.setInfoType(e.target.value))
                }
                sx={{ minWidth: 120 }}
              >
                <MenuItem value="definition">Definición</MenuItem>
                <MenuItem value="examples">Ejemplos</MenuItem>
                <MenuItem value="synonyms">Sinónimos</MenuItem>
                <MenuItem value="antonyms">Antónimos</MenuItem>
                <MenuItem value="conjugations">Conjugaciones</MenuItem>
              </Select>
            )}

            <TextField
              fullWidth
              multiline
              rows={4}
              variant="outlined"
              label="Ingrese texto para traducir"
              value={inputText}
              onChange={(e) =>
                dispatch(translatorSlice.actions.setInputText(e.target.value))
              }
            />
            <Box sx={{ display: "flex", gap: 2 }}>
              <Select
                value={targetLanguage}
                onChange={(e) =>
                  dispatch(
                    translatorSlice.actions.setTargetLanguage(e.target.value)
                  )
                }
                sx={{ minWidth: 120 }}
              >
                <MenuItem value="es">Español</MenuItem>
                <MenuItem value="en">Inglés</MenuItem>
                <MenuItem value="fr">Francés</MenuItem>
                <MenuItem value="de">Alemán</MenuItem>
                <MenuItem value="it">Italiano</MenuItem>
              </Select>
              <Select
                value={formalityLevel}
                onChange={(e) =>
                  dispatch(
                    translatorSlice.actions.setFormalityLevel(e.target.value)
                  )
                }
                sx={{ minWidth: 120 }}
              >
                <MenuItem value="informal">Informal</MenuItem>
                <MenuItem value="normal">Normal</MenuItem>
                <MenuItem value="formal">Formal</MenuItem>
              </Select>
            </Box>
            <Button
              variant="contained"
              onClick={handleTranslate}
              sx={{ flexGrow: 1 }}
            >
              Traducir
            </Button>
            <TextField
              fullWidth
              multiline
              rows={4}
              variant="outlined"
              label="Traducción"
              value={translatedText}
              InputProps={{ readOnly: true }}
            />
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button
                variant="outlined"
                startIcon={<VolumeUpIcon />}
                onClick={() => handleSpeak(inputText, "en-US")}
              >
                Original
              </Button>
              <Button
                variant="outlined"
                startIcon={<VolumeUpIcon />}
                onClick={() => handleSpeak(translatedText, targetLanguage)}
              >
                Traducción
              </Button>
              <Button
                variant="outlined"
                startIcon={<FavoriteIcon />}
                onClick={() => {
                  if (translationType === "word") {
                    dispatch(
                      translatorSlice.actions.addFavoriteWord(inputText)
                    );
                  } else {
                    dispatch(
                      translatorSlice.actions.addFavoritePhrase(inputText)
                    );
                  }
                }}
              >
                Agregar a favoritos
              </Button>
            </Box>
            {translationType === "word" && (
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>Información Adicional</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {infoType === "definition" && (
                    <Typography>{wordInfo}</Typography>
                  )}
                  {infoType === "examples" && (
                    <List>
                      {examples.map((example, index) => (
                        <ListItem key={index}>
                          <ListItemText primary={example} />
                        </ListItem>
                      ))}
                    </List>
                  )}
                  {infoType === "synonyms" && (
                    <List>
                      {synonyms.map((synonym, index) => (
                        <ListItem key={index}>
                          <ListItemText primary={synonym} />
                        </ListItem>
                      ))}
                    </List>
                  )}
                  {infoType === "antonyms" && (
                    <List>
                      {antonyms.map((antonym, index) => (
                        <ListItem key={index}>
                          <ListItemText primary={antonym} />
                        </ListItem>
                      ))}
                    </List>
                  )}
                  {infoType === "conjugations" && (
                    <>
                      {Object.entries(conjugations).map(([tense, forms]) => (
                        <Box key={tense} sx={{ mb: 2 }}>
                          <Typography variant="h6">{tense}</Typography>
                          <List>
                            {forms.map((form, index) => (
                              <ListItem key={index}>
                                <ListItemText primary={form} />
                              </ListItem>
                            ))}
                          </List>
                        </Box>
                      ))}
                    </>
                  )}
                </AccordionDetails>
              </Accordion>
            )}
          </Box>
        </Paper>

        <Paper
          elevation={3}
          sx={{
            p: 3,
            mt: 4,
            backgroundColor: "background.paper",
            border: "2px solid",
            borderColor: "primary.main",
            boxShadow: "0 0 20px",
            color: "text.primary",
          }}
        >
          <Typography variant="h5" gutterBottom>
            Generador de Respuestas
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              fullWidth
              variant="outlined"
              label="Ingrese una pregunta en inglés"
              value={questionInput}
              onChange={(e) =>
                dispatch(
                  translatorSlice.actions.setQuestionInput(e.target.value)
                )
              }
            />
            <FormControl component="fieldset">
              <FormLabel component="legend">Tono de la Respuesta</FormLabel>
              <RadioGroup
                row
                value={answerTone}
                onChange={(e) =>
                  dispatch(
                    translatorSlice.actions.setAnswerTone(e.target.value)
                  )
                }
              >
                <FormControlLabel
                  value="positive"
                  control={<Radio />}
                  label="Positivo"
                />
                <FormControlLabel
                  value="neutral"
                  control={<Radio />}
                  label="Neutral"
                />
                <FormControlLabel
                  value="negative"
                  control={<Radio />}
                  label="Negativo"
                />
              </RadioGroup>
            </FormControl>
            <Button variant="contained" onClick={handleGenerateAnswer}>
              Generar Respuesta
            </Button>
            <TextField
              fullWidth
              multiline
              rows={4}
              variant="outlined"
              label="Respuesta Generada"
              value={generatedAnswer}
              InputProps={{ readOnly: true }}
            />
            <Button
              variant="outlined"
              startIcon={<FavoriteIcon />}
              onClick={() =>
                dispatch(
                  translatorSlice.actions.addFavoriteAnswer(generatedAnswer)
                )
              }
            >
              Agregar respuesta a favoritos
            </Button>
          </Box>
        </Paper>

        <Paper
          elevation={3}
          sx={{
            p: 3,
            mt: 4,
            backgroundColor: "background.paper",
            border: "2px solid",
            borderColor: "primary.main",
            boxShadow: "0 0 20px",
            color: "text.primary",
          }}
        >
          <Typography variant="h5" gutterBottom>
            Mis Favoritos
          </Typography>
          <Tabs
            value={favoritesTab}
            onChange={(e, newValue) => setFavoritesTab(newValue)}
          >
            <Tab label="Palabras" />
            <Tab label="Frases" />
            <Tab label="Respuestas" />
          </Tabs>
          {favoritesTab === 0 && (
            <List>
              {favoriteWords.map((word, index) => (
                <ListItem key={index}>
                  <ListItemText primary={word} />
                  <IconButton
                    onClick={() =>
                      dispatch(translatorSlice.actions.removeFavoriteWord(word))
                    }
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItem>
              ))}
            </List>
          )}
          {favoritesTab === 1 && (
            <List>
              {favoritePhrases.map((phrase, index) => (
                <ListItem key={index}>
                  <ListItemText primary={phrase} />
                  <IconButton
                    onClick={() =>
                      dispatch(
                        translatorSlice.actions.removeFavoritePhrase(phrase)
                      )
                    }
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItem>
              ))}
            </List>
          )}
          {favoritesTab === 2 && (
            <List>
              {favoriteAnswers.map((answer, index) => (
                <ListItem key={index}>
                  <ListItemText primary={answer} />
                  <IconButton
                    onClick={() =>
                      dispatch(
                        translatorSlice.actions.removeFavoriteAnswer(answer)
                      )
                    }
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItem>
              ))}
            </List>
          )}
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

// export const App = () => {
//   return (
//     <Provider store={store}>
//       <TranslatorApp />
//     </Provider>
//   );
// };
