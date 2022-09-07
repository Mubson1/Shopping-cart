import { useEffect, useState } from "react";

//Here, T allows us to pass any thing as the props. If the props is in string, T will be in string and if T is in component, T will be ReactNode
export function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
    //this useState will get the value from localStorage or from the initial value that we give
    const [value, setValue] = useState<T>(() => {
        //setValue to whatever is in localStorage
        const jsonValue = localStorage.getItem(key)
        if (jsonValue != null) return JSON.parse(jsonValue)

        //setValue to whatever we have given as initialValue
        if(typeof initialValue === "function") {
            //if initialValue is a function:
            return (initialValue as () => T) ()         //This is same as initialValue(). We did this as there was a typescript error
        } else{
            //if initialValue is not a function
            return initialValue
        }
    })

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [key, value])

    return [value, setValue] as [typeof value, typeof setValue]
}