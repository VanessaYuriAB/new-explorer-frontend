import { useMemo } from 'react';

// Aplicado em NewsCard e em SavedNewsCard

function useFormattedDateBR(publishedAt) {
  // Reformatação da data do artigo (publishedAt) com Intl.DateTimeFormat
  // For Brazilian Portuguese: "26 de janeiro de 2025"
  // useMemo para evitar processamento de cálculos desnecessários para cada card
  // Verificação da propriedade, com fallback caso não exista
  return useMemo(() => {
    return publishedAt
      ? new Intl.DateTimeFormat('pt-BR', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }).format(new Date(publishedAt))
      : 'Data indisponível';
  }, [publishedAt]);
}

export default useFormattedDateBR;
