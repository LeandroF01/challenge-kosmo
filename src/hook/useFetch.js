import { useEffect, useState } from "react";



export const useFetch = () => { 
    
    const [imageBackground, setImageBackground] = useState()
    
    useEffect(() => {
        const URL = "https://jsonplaceholder.typicode.com/photos";
        fetch(URL)
        .then(response => response.json())
        .then(data => setImageBackground(data))
      }, [])
    
        
      
    return imageBackground
}

 
