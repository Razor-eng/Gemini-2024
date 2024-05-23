/* eslint-disable react/prop-types */
import { createContext, useState } from "react";
import run from "../Config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {

    const [input, setInput] = useState('');
    const [recentPrompt, setRecentPrompt] = useState('');
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState('');

    const delayPara = (index, nextWord) => {
        setTimeout(() => {
            setResultData(prev => prev + nextWord);
        }, 75 * index);
    }

    const newChat = () => {
        setLoading(false);
        setShowResults(false);
        setPrevPrompts([]);
    }

    const onSent = async (prompt) => {
        setResultData("");
        setLoading(true);
        setShowResults(true);
        let response = '';
        if (prompt !== undefined) {
            setRecentPrompt(prompt);
            response = await run(prompt);
        } else {
            setPrevPrompts(prev => [...prev, input]);
            setRecentPrompt(input);
            response = await run(input);
        }
        let responseArray = response.split("**");
        let newResponse = '';
        for (let i = 0; i < responseArray.length; i++) {
            if (i === 0 || i % 2 !== 1) {
                newResponse += responseArray[i];
            } else {
                newResponse += "<b>" + responseArray[i] + "</b>";
            }
        }

        let newResponse2 = newResponse.split('*').join("<br />").replace('##', '');
        let newResponseArray = newResponse2.split(" ");
        for (let i = 0; i < newResponseArray.length; i++) {
            delayPara(i, newResponseArray[i] + " ");
        }
        setLoading(false);
        setInput('');
    }

    const contextValue = {
        onSent,
        prevPrompts, setPrevPrompts,
        recentPrompt, setRecentPrompt,
        showResults,
        loading,
        resultData,
        input, setInput,
        newChat
    }

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider