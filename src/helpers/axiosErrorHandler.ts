import { AxiosError } from "axios";
import { stringify } from "flatted";

/**
 * @param error O erro capturado
 */
export function handleAxiosError(error: unknown): string|object {
  if (!(error instanceof AxiosError)) {
    console.error("Erro inesperado:", error);
    return "Unexpected error.";
  }

  const { response, request, message } = error;

  if (response) {
    console.error("Erro de resposta:", response.status, response.data);
    let messageError = error.response
    ? error.response.data
    : error.message;
    return {
        status: response.status,
        messageError
    };
  }

  if (request) {
    console.error("Nenhuma resposta recebida do servidor:", request);
    return "Network error: No response received from the server.";
  }

  console.error("Erro na configuração da requisição:", message);
  return `Error in request configuration: ${message}`;
}


export function serializeError(error: unknown): string {
    if (typeof error === "object" && error !== null) {
      const serializedError: any = {};
  
      if (error instanceof Error) {
        serializedError.name = error.name;
        serializedError.message = error.message;
        serializedError.stack = error.stack;
      }
  
      for (const key in error) {
        if (Object.prototype.hasOwnProperty.call(error, key)) {
          try {
            const value = (error as any)[key];
            serializedError[key] = typeof value === "object" ? stringify(value) : value;
          } catch (innerError) {
            serializedError[key] = `Failed to serialize property: ${key}`;
          }
        }
      }
  
      return stringify(serializedError);
    }
  
    return String(error);
  }
  
