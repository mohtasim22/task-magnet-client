import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Banner = () => {

    const handleSearch = (e) => {
        const value = e.target.value;
        console.log(value)
        history.push(`/posts/${value}`);
    };
   
    const [options, setOptions] = useState([]);
    useEffect(()=>{
        fetch(`https://assignment-12-server-murex-sigma.vercel.app/tags`)
        .then(res =>res.json()
        )
        .then((data) =>{
            console.log(data)
            setOptions(data);
        }
        )
        
    },[])
    const tagsArray = options.map(item => item.value);
    // const tagsArray = ['tag1', 'tag2', 'tag3'];
    console.log(tagsArray)
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [suggestions, setSuggestions] = useState(['tag1', 'tag2', 'tag3']); // Replace with your actual list of suggestions
    const [rsuggestions, setRsuggestions] = useState(['']); // Replace with your actual list of suggestions

    const handleInputChange = (e) => {
      const value = e.target.value;
      setSearchTerm(value);
  
      // Filter suggestions based on the input value
      if (value!==''){
      const filteredSuggestions = tagsArray.filter((suggestion) =>
        suggestion.toLowerCase().startsWith(value.toLowerCase())
      );
        console.log(filteredSuggestions)
        setRsuggestions(filteredSuggestions);
        console.log(rsuggestions)
      }else{
        setRsuggestions([]);
      }
      // Update the suggestions list
    //   setSuggestions(filteredSuggestions);
        
    };
  
    const handleSuggestionClick = (suggestion) => {
      // Set the search term when a suggestion is clicked
      setSearchTerm(suggestion);
  
      // Trigger the search
      handleSearch();
    };
        
    return (
        <div className="banner-section">
            <div className="text-center text-white font-rajdhani banner-section font-bold" data-aos="fade-up" data-aos-duration="1000">
            
                <h1>- Forum Focus -</h1>
                <h2>Where Ideas Unite</h2>
                <h3>Discussions Ignite</h3>

                <form action="">
                    <input type="text"
                        // value={searchTerm}
                        onChange={handleInputChange}
                        placeholder="Search by tag"
                        className="input input-bordered w-full max-w-xs mt-16" />
                    
                    {suggestions.length > 0 && (
                        <ul className="mt-3 text-left max-w-xs mx-auto">
                        {rsuggestions.map((suggestionx) => (
                            <Link key={suggestionx} to={`/posts/${suggestionx}`} ><li className="pl-4"  onClick={() => handleSuggestionClick(suggestionx)}>
                            {suggestionx}
                            </li></Link>
                            
                        ))}
                        </ul>
                    )}
                </form>
                
                
            </div>
        </div>
    );
};

export default Banner;