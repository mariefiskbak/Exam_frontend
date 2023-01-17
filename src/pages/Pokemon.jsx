import React, { useEffect, useState } from 'react'
import '../styles/pokesite.css'
import facade from '../apiFacade.js'



const Pokemon = () => {

const [id, setId] = useState("")
const [data, setData] = useState({})



 

function findPokemon() {
     

    let input = document.getElementById("inputId").value

    let button = document.getElementById("disable")
   
    
    

  if (!button.disabled)
  {  
    
    button.disabled = true;
    facade.findPokemon(input)
        .then((res) => {
            setData(res)
            setTimeout(() => {
                button.disabled = false;
            }, 3000)

            
    
        })
        
    

        
}

}





  return (
    <div className="Pokesite">
            <div className="pokeLeft">
                <div className="pokeLeftContent">
                    <p className="search">
                        find pokemon
                    </p>
                    <p className="searchDesc">Find en pokemon med vores smarte Pokemon API</p>
                    <input id='inputId' type="text" placeholder="1 || pikachu"/>
                    <button id="disable" onClick={findPokemon} className='pokeButton'>
                        <div className="innerPoke">
                            <div className="midPoke"></div>
                            <div className="midCircle">
                                <div className="midInnerCircle">

                                </div>
                            </div>
                            <div className="innerBottom"></div>


                        
                        </div>
                    </button>
                </div>
                
            </div>
            <div className="pokeRight">
                <div className="pokedex">
                    <div className="pokedexTop">
                        <div className="pokedexTopLeft">
                            <div className="bigCircle"></div>
                            <div className="circleArray">
                                <div id="first" className="smallCircle"></div>
                                <div id="second" className="smallCircle"></div>
                                <div id="third" className="smallCircle"></div>
                            </div>
                        </div>
                        <div className="pokedexTopRight"></div>
                        <div className="line"></div>
                    </div>
                    
                    <div className="pokemonWindow">
                    


                        <div className="windowTop" id="pokemonWindow">

                            <img src={data?.pokemonImage} alt="" className="src" />
                            <p>Id#{data?.pokemonId}</p> 

                        </div>
                        <p>{data?.pokemonName}</p>
                        <p className="random">{data?.randomFact}</p>

                    </div>
                    <div className="bottomDisplay">
                        <div className="displayLeft"></div>
                        <div className="displayMid">
                            <div className="midTopButtons">
                                <div className="midTopButton"></div>
                                <div id="blue" className="midTopButton"></div>
                            </div>
                            <div className="midBottomButton"></div>
                        </div>
                        <div className="displayRight">
                            <div className="xButtonLayer1"></div>
                            <div className="xButtonLayer2"></div>

                        </div>
                    </div>
            
                </div>
                
            </div>

    </div>
  )
}

export default Pokemon
