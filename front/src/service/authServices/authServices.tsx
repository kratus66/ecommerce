
export const loginService = async (url: string, body: object) => {
    console.log(body,url);
    
    const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    });
    if (!response.ok) {
        throw new Error("Error al iniciar sesión");
    }
    const data = await response.json();
    return data;
};

////////////////////////////////////////////

export const registerService = async (url: string, body: object) => {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body), // Convertimos el cuerpo a JSON
    });
  
    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage || "Error al registrar usuario");
    }
  
    const data = await response.json();
    return data;
  };
  