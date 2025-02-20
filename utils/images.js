export const analyzeImage = async (imageUrl) => {
    console.log('on est dans la bonne fonction')
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/images/analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imageUrl }),
      });
  
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Erreur inconnue');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erreur lors de l\'analyse de l\'image:', error);
      throw error;
    }
  };
  