import { useState } from "react";
import { logout } from "./user";

export const fetchDogs = (navigate) => {
    const [dogId, setDogId] = useState({});
    const [data, setData] = useState([]);
    const [searchParam, setSearchParam] = useState({sort: "breed:asc"});
    const [isLoading, setLoading] = useState(false);
    
    const parseSearchParam = () => {
        let param = "?"
        for (const [key, value] of Object.entries(searchParam)) {
            if(value) {
                if (`${key}` === "age") {
                    param += `ageMin=${value[0]}&`
                    param += `ageMax=${value[1]}&`    
                } else if (`${key}` === "breeds") {
                    value.forEach(breed => {
                        param += `breeds[]=${breed}&`                      
                    });
                }else {
                    param += `${key}=${value}&`
                }
            }
            
        }
        if (!Object.hasOwn(searchParam, 'sort')) {
            param += "sort=breed:asc&"
        }
        param = param.substring(0, param.length - 1);
        return param;
    }

    const getDogsIds = async() => {     
        const param = parseSearchParam();

        try {
            const res = await fetch(
                `${import.meta.env.VITE_FETCH_BASE_URL}/dogs/search${param}`,
                {
                    method: 'GET',
                    credentials: 'include',
                },       
            );
            if (res.status == 401) {
                logout(navigate);
                return; 
            } else {
                const ids = await res.json();
                setDogId(ids)
                return ids;
            }
            
        } catch (error) {
            console.error(error); 
        } 
    };

    const getDogs = async(findId) => {
        setLoading(true);
        const ids = findId ? findId : (await getDogsIds()).resultIds;

        try {
            const res = await fetch(
                `${import.meta.env.VITE_FETCH_BASE_URL}/dogs`,
                {
                    method: 'POST',
                    body: JSON.stringify(ids),
                    headers: {
                        'Content-Type': 'application/JSON'
                    },
                    credentials: 'include',
                },       
            );
            if (res.status == 401) {
                logout(navigate);
                return; 
            } else {
                const dogData = await res.json();
                if (!findId) {
                    setData(dogData);
                }
                setLoading(false);
                return dogData;
            }
            
        } catch (error) {
            console.error(error); 
        } 
    }

    return {isLoading, dogId, data, fetchDogs, getDogs, searchParam, setSearchParam}; 
}