export const getProductService = async (url: string) => {
    const response = await fetch(url, { next: { revalidate: 0 } });
    if (!response.ok) {
      throw new Error("Error al obtener los productos");
    }
    const data = await response.json();
    return data;
  };
  