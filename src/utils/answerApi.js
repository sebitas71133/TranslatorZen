import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY);

export const generateChatResponse = async (
  text,
  answerTone,
  responseStyle,
  responseLength,
  enthusiasmLevel,
  conversationContext,
  responseFormat
) => {
  console.log({
    text,
    answerTone,
    responseStyle,
    responseLength,
    enthusiasmLevel,
    conversationContext,
    responseFormat,
  });

  if (!text.trim() || text.split(" ").length < 3) {
    return "El mensaje parece demasiado corto para generar una respuesta.";
  }

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `Antes de responder determina si el mensaje seria parte de una conversacion, si no es asi responder con :  
  "Este mensaje no parece una conversación válida."  
  
  Si es válido, genera una respuesta siguiendo estas indicaciones:  
  - Mensaje recibido: "${text}"  
  - Tono de la respuesta: ${answerTone}.  
  - Estilo de respuesta: ${responseStyle}.  
  - Longitud: ${responseLength}.  
  - Nivel de entusiasmo: ${enthusiasmLevel}.  
  - Contexto: ${conversationContext}.  
  - Formato: ${responseFormat}.  
  
  La respuesta debe ser en inglés, fluida, natural y acorde al contexto.  
  Si el formato es "lista", responde con elementos numerados.  
  Si el formato es "emoji", incluye emojis apropiados en la respuesta.  
  Responde sin explicaciones ni texto adicional.
  `;

  try {
    console.log(prompt);

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const generatedText = await response.text();
    return generatedText.trim();
  } catch (error) {
    console.error("Error al generar respuesta:", error);
    return "Error al generar respuesta.";
  }
};
