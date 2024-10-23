import api from "../../Api";
import { useState } from "react";


function PostSearch({ oneResult }) {
    const [query, setQuery] = useState('')

    const handleSearch = async (e) => {
        e.preventDefault()

        try {
            const response = await api.get(`/content/post/search/?q=${query}`);
            oneResult(response.data);
        } catch(error) {
            console.error('eror searching', error)
        }
    }

    return (
        <form action="" onSubmit={handleSearch}>
            <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
            <button type="submit">submit</button>
        </form>
    )
}



export default PostSearch;