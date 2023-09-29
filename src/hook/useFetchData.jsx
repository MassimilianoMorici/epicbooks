import { useEffect, useState } from "react";

function useFetchData(url) {

    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTE0M2RhYzJjMjllYzAwMTk4NzJmM2UiLCJpYXQiOjE2OTU4MjUzMjQsImV4cCI6MTY5NzAzNDkyNH0.WIKziaLUpdjhnPoM44S-6y-doqRbu5ytZZiYBhDhPsU"

    const [data, setData] = useState([]);
    const [isloading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const getData = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },

            });
            const data = await response.json();
            setData(data);
            setIsLoading(false);
        } catch (e) {
            setError(e);
        }
    };

    useEffect(() => {
        getData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [url]);

    return { data, setData, getData, isloading, error }

}

export default useFetchData;