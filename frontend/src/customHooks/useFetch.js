import { useState, useEffect } from "react";    

const useFetch = ( url, options) => {
    const [data, setData] = useState(null) // store the response data
    const [loading, setLoading] = useState(true) // Handle loading state
    const [error, setError] = useState(null) // Handle error state
    
    useEffect(() => {
        if(!url) return // If no URL, return
        const fetchData = async () => {
            setLoading(true)
            setError(null)

            try {
                const response = await fetch(url, options)
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }          
                const result = await response.json();
                setData(result);
            } catch (err){
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [url, options])

    return { data, loading, error}
}

export default useFetch;