import { useState } from "react";
import PostSearch from "./Search";


function SearchResult() {
    const [results, setResults] = useState([])


    function handleResults(data) {
        setResults(data)
    }

    return (
        <>
        <PostSearch oneResult={handleResults}/>
        
            {results.length > 0 ? (results.map((result)=>(
            <div key={result.id}>
                    {result.title}
                    <img src={result.file} alt="" />
            </div>
            ))) : <p>No </p> }
        </>
    )
}


 export default SearchResult