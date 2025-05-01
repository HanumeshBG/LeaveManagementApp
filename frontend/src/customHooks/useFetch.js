import { useState, useEffect } from "react";    

const useFetch = ( url, options, {retries = 3, retryDelay = 1000} = {}) => {
    const [data, setData] = useState(null) // store the response data
    const [loading, setLoading] = useState(true) // Handle loading state
    const [error, setError] = useState(null) // Handle error state
    
    useEffect(() => {
        if(!url) return // If no URL, return

        const controller = new AbortController() // Create a new AbortController instance
        const signal = controller.signal // Get the signal from the controller
        
        const fetchData = async (attempt = 1) => {
            setLoading(true)
            setError(null)

            try {
                const response = await fetch(url, {...options, signal})
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }          
                const result = await response.json();
                setData(result);
            } catch (err){
                if(err.name === 'AbortError') {
                    return  // Fetch was aborted, do nothing
                }   
                if(attempt <= retries) {
                    setTimeout(() => fetchData(attempt + 1), retryDelay) // Retry fetching data
                    return
                } else {
                    setError(err.message) // Set error message
                }
            } finally {
                setLoading(false)
            }
        }

        fetchData()

        return () => {
            controller.abort();
        };

    }, [url])

    return { data, loading, error}
}

export default useFetch;