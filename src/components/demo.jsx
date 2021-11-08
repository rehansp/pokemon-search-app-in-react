import React, {useState, useEffect} from "react";

const Demo = () => {
    
    const [pokeData, setPokeData] = useState([]);
    const [filter, setFilter] = useState('');

    const searchText = (event) =>{
        setFilter(event.target.value);
    }

    useEffect(() => {
        FetchPokemons();
    })

    async function FetchPokemons(){
        return await fetch(`https://pokeapi.co/api/v2/pokemon?limit=500`)
            .then(response => response.json())
                .then(pokeData => {
                    console.log(pokeData.results);
                    setPokeData(pokeData.results);
                } )
    }

    let pokeSearch = pokeData.filter(item => {
        return Object.keys(item).some(key => item[key].toString().toLowerCase().includes(filter.toString().toLowerCase()))
    })

    return (
        <>
            <section className = "py-4 container">
                <div className = "row justify-content-center">
                    <div className = "col-12 mb-5">
                        <div className = "mb-3 col-4 mx-auto">
                            <label className = "form-label h3" style = {{fontWeight : "bold"}}>Pokemon Database</label>
                            <br />
                            <br />
                            <input type="text" 
                            className = "form-control"
                            value = {filter}
                            placeholder = "search your pokemons"
                            onChange = {searchText.bind(this)}/>
                        </div>
                    </div>
                    {pokeSearch.map(items => (
                    
                    <div className = "col-11 col-md-6 col-lg-3 mx-0 mb-4">
                        <div className = "card p-0 overflow-hidden h-100 shadows">
                            <div className = "card-body" >
                            <a href = {`https://pokemon.com/us/pokedex/${items.name}`} style = {{textDecoration:"none"}} target = "_blank" rel = "noreferrer">
                                <div className = "img-container">
                                    <img src = {`https://img.pokemondb.net/artwork/${items.name}.jpg`} alt = {items.name} style = {{width:"200px", height: "200px"}}/>
                                </div>
                                <h1 style = {{textDecoration:"none", color: "black", marginTop: "20px" }}>{items.name}</h1>
                            </a>
                            </div>
                        </div>
                    </div>
                    ))}
                </div>
            </section>
        </>
    )
}

export default Demo;