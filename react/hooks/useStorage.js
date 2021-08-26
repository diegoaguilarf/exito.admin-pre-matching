import { useEffect, useState } from "react"

const useStorage = () => {

    const [matcherState, sMS] = useState({
        mainProduct: null,
        multiOffers: null,
        currentItem: null,
        currentSeller: null
    });
    const [loadingState, setLoadingState] = useState(true);

    useEffect(() => {
        sMS(getMatcherState());
        setLoadingState(false);
    }, [])

    const setMatcherState = (state) => {
        const oldState = getMatcherState();
        localStorage.setItem("matcher/data", JSON.stringify({ ...oldState, ...state }))
        sMS({ ...oldState, ...state });
    }

    const getMatcherState = () => {
        setLoadingState(true);
        return JSON.parse(localStorage.getItem("matcher/data"));
    }

    return {
        setMatcherState,
        getMatcherState,
        matcherState,
        loadingState
    }

}

export default useStorage;