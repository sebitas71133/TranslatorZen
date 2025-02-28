import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  ListItem,
  ListItemText,
  MenuItem,
  Paper,
  Select,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
} from "@mui/material";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useCallback, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addFavoritePhrase,
  addFavoriteWord,
  setDarkMode,
  setFormalityLevel,
  setInfoType,
  setInputText,
  setIsLoading,
  setSituation,
  setTargetLanguage,
  setTranslatedText,
  setTranslationInfo,
  setTranslationType,
  setVariant,
} from "../store/slices/translatorSlice";
import { translatorApi } from "../utils/translatorApi";
import { IdiomaticToggle } from "../components/IdiomaticToggle";
import { TranslatorForm } from "./components/TranslatorForm";

export const TranslatorApp = () => {
  const dispatch = useDispatch();
  const {
    // inputText,
    translatedText,
    targetLanguage,
    formalityLevel,
    situation,
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
    variant,
    generatedAnswer,
    favoriteWords,
    favoritePhrases,
    favoriteAnswers,
    isLoading,
    idiomatic,
  } = useSelector((state) => state.translator);

  const idiomas = [
    "Ingles",
    "Portuguese",
    "Ruso",
    "Español",
    "Italiano",
    "Frances",
    "Aleman",
  ];

  const situaciones = [
    "Redes sociales",
    "Académico",
    "Negocios",
    "Tecnologia",
    "Médico",
    "Legal",
    "Juegos",
    "Cine/TV",
  ];

  const formalidad = ["Informal", "Neutro", "Formal"];

  const variantes = ["Americano", "Britanico", "Australiano"];

  const tipoDeInfo = [
    "Definición",
    "Ejemplos",
    "Sinónimos",
    "Antónimos",
    "Conjugaciones",
  ];

  const [favoritesTab, setFavoritesTab] = useState(0);

  const [inputText, setInputText] = useState("");

  const handleInputChange = useCallback((e) => {
    console.log(e.target.value);
    setInputText(e.target.value);
  }, []);

  const handleTranslate = async () => {
    if (!inputText) {
      console.log("ingrese un texto a traducir");
      return;
    }
    dispatch(setIsLoading(true));
    try {
      const result = await translatorApi(
        inputText,
        targetLanguage,
        formalityLevel,
        translationType,
        situation,
        variant,
        idiomatic
      );

      dispatch(setTranslatedText(result));
    } catch (error) {
      console.error("Error en la traduccion: ", error);
    } finally {
      dispatch(setIsLoading(false));
    }

    if (translationType === "word") {
      // const info = await mockGetWordInfo(inputText, infoType);
      // dispatch(setTranslationInfo(info));
      // switch (infoType) {
      //   case "definition":
      //     dispatch(setWordInfo(info));
      //     break;
      //   case "examples":
      //     dispatch(setExamples(info));
      //     break;
      //   case "synonyms":
      //     dispatch(setSynonyms(info));
      //     break;
      //   case "antonyms":
      //     dispatch(setAntonyms(info));
      //     break;
      //   case "conjugations":
      //     dispatch(setConjugations(info));
      //     break;
      // }
    }
  };

  // const handleGenerateAnswer = async () => {
  //   const answer = await mockGenerateAnswer(questionInput, answerTone);
  //   dispatch(setGeneratedAnswer(answer));
  // };

  // const handleSpeak = (text, lang) => {
  //   const utterance = new SpeechSynthesisUtterance(text);
  //   utterance.lang = lang;
  //   window.speechSynthesis.speak(utterance);
  // };

  // const toggleDarkMode = () => {
  //   dispatch(setDarkMode(!darkMode));
  // };

  // const theme = useMemo(
  //   () => getTheme(darkMode ? "dark" : "light"),
  //   [darkMode]
  // );

  console.log("TranslatorApp render");

  // const handleInputChange = useCallback(
  //   (e) => {
  //     dispatch(setInputText(e.target.value));
  //   },
  //   [dispatch]
  // );

  return (
    <TranslatorForm />
    // <Container maxWidth="md" sx={{ mt: 4, color: "text.primary" }}>
    //   <Paper
    //     elevation={3}
    //     sx={{
    //       p: 3,
    //       backgroundColor: "background.paper",
    //       border: "2px solid",
    //       borderColor: "primary.main",
    //       boxShadow: "0 0 20px",
    //       color: "text.primary",
    //     }}
    //   >
    //     <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
    //       <ToggleButtonGroup
    //         value={translationType}
    //         exclusive
    //         onChange={(e, newValue) => dispatch(setTranslationType(newValue))}
    //         aria-label="translation type"
    //       >
    //         <ToggleButton value="word" aria-label="word translation">
    //           Palabra
    //         </ToggleButton>
    //         <ToggleButton value="phrase" aria-label="phrase translation">
    //           Frase
    //         </ToggleButton>
    //       </ToggleButtonGroup>

    //       {translationType === "word" && (
    //         <Select
    //           value={infoType}
    //           onChange={(e) => dispatch(setInfoType(e.target.value))}
    //           sx={{ minWidth: 120 }}
    //         >
    //           {tipoDeInfo.map((tipo) => (
    //             <MenuItem value={tipo} key={tipo}>
    //               {tipo}
    //             </MenuItem>
    //           ))}
    //         </Select>
    //       )}

    //       <TextField
    //         fullWidth
    //         multiline
    //         rows={4}
    //         variant="outlined"
    //         label="Ingrese texto para traducir"
    //         value={inputText}
    //         onChange={handleInputChange}
    //       />
    //       {/* OPCIONES  */}
    //       <Box
    //         sx={{
    //           display: "flex",
    //           gap: 2,
    //           overflowX: "auto",
    //           whiteSpace: "nowrap",
    //           paddingBottom: 1,
    //           scrollbarWidth: "thin", // Para navegadores que soportan esta propiedad
    //           scrollbarColor: "#888 transparent", // Color de la barra y el fondo
    //           "&::-webkit-scrollbar": {
    //             height: "6px", // Altura de la barra de desplazamiento
    //           },
    //           "&::-webkit-scrollbar-track": {
    //             background: "transparent", // Fondo transparente
    //           },
    //           "&::-webkit-scrollbar-thumb": {
    //             background: "#888", // Color de la barra
    //             borderRadius: "10px", // Bordes redondeados
    //           },
    //           "&::-webkit-scrollbar-thumb:hover": {
    //             background: "#555", // Oscurecer al pasar el mouse
    //           },
    //         }}
    //       >
    //         <Select
    //           value={targetLanguage}
    //           onChange={(e) => dispatch(setTargetLanguage(e.target.value))}
    //           sx={{ minWidth: 120 }}
    //         >
    //           {idiomas.map((idioma) => (
    //             <MenuItem value={idioma} key={idioma}>
    //               {idioma}
    //             </MenuItem>
    //           ))}
    //         </Select>
    //         <Select
    //           value={formalityLevel}
    //           onChange={(e) => dispatch(setFormalityLevel(e.target.value))}
    //           sx={{ minWidth: 120 }}
    //         >
    //           {formalidad.map((formalidad) => (
    //             <MenuItem value={formalidad} key={formalidad}>
    //               {formalidad}
    //             </MenuItem>
    //           ))}
    //         </Select>{" "}
    //         <Select
    //           value={situation}
    //           onChange={(e) => dispatch(setSituation(e.target.value))}
    //           sx={{ minWidth: 120 }}
    //         >
    //           {situaciones.map((situation) => (
    //             <MenuItem value={situation} key={situation}>
    //               {situation}
    //             </MenuItem>
    //           ))}
    //         </Select>
    //         {/* <Tooltip title="Ingrese el contexto de la traduccion">

    //         </Tooltip> */}
    //         <Select
    //           value={variant}
    //           onChange={(e) => dispatch(setVariant(e.target.value))}
    //           sx={{ minWidth: 120 }}
    //         >
    //           {variantes.map((variant) => (
    //             <MenuItem value={variant} key={variant}>
    //               {variant}
    //             </MenuItem>
    //           ))}
    //         </Select>
    //         <IdiomaticToggle></IdiomaticToggle>
    //       </Box>
    //       <Button
    //         variant="contained"
    //         onClick={handleTranslate}
    //         sx={{ flexGrow: 1 }}
    //         disabled={isLoading}
    //       >
    //         {isLoading ? "Traduciendo..." : "Traducir"}
    //       </Button>
    //       <TextField
    //         fullWidth
    //         multiline
    //         rows={4}
    //         variant="outlined"
    //         label="Traducción"
    //         value={translatedText}
    //         InputProps={{ readOnly: true }}
    //       />

    //       {/* BOTONES */}
    //       <Box
    //         sx={{
    //           display: "flex",
    //           gap: 2,
    //           flexWrap: "wrap",
    //           justifyContent: "center",
    //           alignItems: "center",
    //         }}
    //       >
    //         <Button
    //           variant="outlined"
    //           startIcon={<VolumeUpIcon />}
    //           onClick={() => handleSpeak(inputText, "en-US")}
    //         >
    //           Original
    //         </Button>
    //         <Button
    //           variant="outlined"
    //           startIcon={<VolumeUpIcon />}
    //           onClick={() => handleSpeak(translatedText, targetLanguage)}
    //         >
    //           Traducción
    //         </Button>
    //         <Button
    //           variant="outlined"
    //           startIcon={<FavoriteIcon />}
    //           onClick={() => {
    //             if (translationType === "word") {
    //               dispatch(addFavoriteWord(inputText));
    //             } else {
    //               dispatch(addFavoritePhrase(inputText));
    //             }
    //           }}
    //         >
    //           Agregar a favoritos
    //         </Button>
    //       </Box>
    //       {/* {translationType === "word" && (
    //         <Accordion>
    //           <AccordionSummary expandIcon={<ExpandMoreIcon />}>
    //             <Typography>Información Adicional</Typography>
    //           </AccordionSummary>
    //           <AccordionDetails>
    //             {infoType === "definition" && (
    //               <Typography>{wordInfo}</Typography>
    //             )}
    //             {infoType === "examples" && (
    //               <List>
    //                 {examples.map((example, index) => (
    //                   <ListItem key={index}>
    //                     <ListItemText primary={example} />
    //                   </ListItem>
    //                 ))}
    //               </List>
    //             )}
    //             {infoType === "synonyms" && (
    //               <List>
    //                 {synonyms.map((synonym, index) => (
    //                   <ListItem key={index}>
    //                     <ListItemText primary={synonym} />
    //                   </ListItem>
    //                 ))}
    //               </List>
    //             )}
    //             {infoType === "antonyms" && (
    //               <List>
    //                 {antonyms.map((antonym, index) => (
    //                   <ListItem key={index}>
    //                     <ListItemText primary={antonym} />
    //                   </ListItem>
    //                 ))}
    //               </List>
    //             )}
    //             {infoType === "conjugations" && (
    //               <>
    //                 {Object.entries(conjugations).map(([tense, forms]) => (
    //                   <Box key={tense} sx={{ mb: 2 }}>
    //                     <Typography variant="h6">{tense}</Typography>
    //                     <List>
    //                       {forms.map((form, index) => (
    //                         <ListItem key={index}>
    //                           <ListItemText primary={form} />
    //                         </ListItem>
    //                       ))}
    //                     </List>
    //                   </Box>
    //                 ))}
    //               </>
    //             )}
    //           </AccordionDetails>
    //         </Accordion>
    //       )} */}
    //     </Box>
    //   </Paper>

    //   {/* <Paper
    //     elevation={3}
    //     sx={{
    //       p: 3,
    //       mt: 4,
    //       backgroundColor: "background.paper",
    //       border: "2px solid",
    //       borderColor: "primary.main",
    //       boxShadow: "0 0 20px",
    //       color: "text.primary",
    //     }}
    //   >
    //     <Typography variant="h5" gutterBottom>
    //       Generador de Respuestas
    //     </Typography>
    //     <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
    //       <TextField
    //         fullWidth
    //         variant="outlined"
    //         label="Ingrese una pregunta en inglés"
    //         value={questionInput}
    //         onChange={(e) =>
    //           dispatch(translatorSlice.actions.setQuestionInput(e.target.value))
    //         }
    //       />
    //       <FormControl component="fieldset">
    //         <FormLabel component="legend">Tono de la Respuesta</FormLabel>
    //         <RadioGroup
    //           row
    //           value={answerTone}
    //           onChange={(e) =>
    //             dispatch(translatorSlice.actions.setAnswerTone(e.target.value))
    //           }
    //         >
    //           <FormControlLabel
    //             value="positive"
    //             control={<Radio />}
    //             label="Positivo"
    //           />
    //           <FormControlLabel
    //             value="neutral"
    //             control={<Radio />}
    //             label="Neutral"
    //           />
    //           <FormControlLabel
    //             value="negative"
    //             control={<Radio />}
    //             label="Negativo"
    //           />
    //         </RadioGroup>
    //       </FormControl>
    //       <Button variant="contained" onClick={handleGenerateAnswer}>
    //         Generar Respuesta
    //       </Button>
    //       <TextField
    //         fullWidth
    //         multiline
    //         rows={4}
    //         variant="outlined"
    //         label="Respuesta Generada"
    //         value={generatedAnswer}
    //         InputProps={{ readOnly: true }}
    //       />
    //       <Button
    //         variant="outlined"
    //         startIcon={<FavoriteIcon />}
    //         onClick={() =>
    //           dispatch(
    //             translatorSlice.actions.addFavoriteAnswer(generatedAnswer)
    //           )
    //         }
    //       >
    //         Agregar respuesta a favoritos
    //       </Button>
    //     </Box>
    //   </Paper>

    //   <Paper
    //     elevation={3}
    //     sx={{
    //       p: 3,
    //       mt: 4,
    //       backgroundColor: "background.paper",
    //       border: "2px solid",
    //       borderColor: "primary.main",
    //       boxShadow: "0 0 20px",
    //       color: "text.primary",
    //     }}
    //   >
    //     <Typography variant="h5" gutterBottom>
    //       Mis Favoritos
    //     </Typography>
    //     <Tabs
    //       value={favoritesTab}
    //       onChange={(e, newValue) => setFavoritesTab(newValue)}
    //     >
    //       <Tab label="Palabras" />
    //       <Tab label="Frases" />
    //       <Tab label="Respuestas" />
    //     </Tabs>
    //     {favoritesTab === 0 && (
    //       <List>
    //         {favoriteWords.map((word, index) => (
    //           <ListItem key={index}>
    //             <ListItemText primary={word} />
    //             <IconButton
    //               onClick={() =>
    //                 dispatch(translatorSlice.actions.removeFavoriteWord(word))
    //               }
    //             >
    //               <DeleteIcon />
    //             </IconButton>
    //           </ListItem>
    //         ))}
    //       </List>
    //     )}
    //     {favoritesTab === 1 && (
    //       <List>
    //         {favoritePhrases.map((phrase, index) => (
    //           <ListItem key={index}>
    //             <ListItemText primary={phrase} />
    //             <IconButton
    //               onClick={() =>
    //                 dispatch(
    //                   translatorSlice.actions.removeFavoritePhrase(phrase)
    //                 )
    //               }
    //             >
    //               <DeleteIcon />
    //             </IconButton>
    //           </ListItem>
    //         ))}
    //       </List>
    //     )}
    //     {favoritesTab === 2 && (
    //       <List>
    //         {favoriteAnswers.map((answer, index) => (
    //           <ListItem key={index}>
    //             <ListItemText primary={answer} />
    //             <IconButton
    //               onClick={() =>
    //                 dispatch(
    //                   translatorSlice.actions.removeFavoriteAnswer(answer)
    //                 )
    //               }
    //             >
    //               <DeleteIcon />
    //             </IconButton>
    //           </ListItem>
    //         ))}
    //       </List>
    //     )}
    //   </Paper> */}
    // </Container>
  );
};
