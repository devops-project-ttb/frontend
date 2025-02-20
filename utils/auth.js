export const registerUser = async (email, password) => {
    const response = await fetch(`${process.env.BACKEND_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
  
    const data = await response.json();
    if (response.ok) {
      return data; 
    } else {
      throw new Error(data.error); 
    }
  };
  
  export const loginUser = async (email, password) => {
    const response = await fetch(`${process.env.BACKEND_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
  
    const data = await response.json();
    if (response.ok) {
      return data.token; 
    } else {
      throw new Error(data.error); 
    }
  };
  