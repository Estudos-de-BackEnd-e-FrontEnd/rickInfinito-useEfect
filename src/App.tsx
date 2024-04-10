import axios from "axios";
import { useEffect, useState } from "react";

interface Character{
    id: number
    name: string;
    status: string;
    species: string;
    image: string
}

function App() {
    /* const [data, setData] = useState<Character>({
        image: "",
        name: "",
        species: "",
        status: ""
    }) */

    const [data, setData] = useState<Character[]>([])

    const [count, setCount] = useState<number>(0)

    useEffect(()=>{
        async function getData (){
            const dataApi = await axios("https://rickandmortyapi.com/api/character")

            const {id,name, species, status, image} = dataApi.data.results[0]
            
            const newCharacter: Character = {
                id,
                name,
                species,
                status,
                image
            }
            setData((data)=> [newCharacter, ...data])
        }

        getData()
    },[count])

    function clear(){
        setData(()=> [])
    }
    return (
        <main >
            <h1>Rick infinito</h1>
            <div style={{
            display: "flex",
            width: 800,
            flexWrap: "wrap",
            margin: "0 auto",
            gap: "10px"
        }}>
                {data.map((item: Character, index) =>(
                    <div key={item.id + index }>
                        <img style={
                            {
                                width: "200px"
                            }
                        } src={item.image}/>
                        <h1>{item.name}</h1>
                        <p>{item.species}</p>
                        <p>{item.status}</p>
                        <button onClick={()=> setCount((prevCount)=> prevCount + 1)}>Clicar</button>
                        <br/>
                        <button onClick={clear}>Limpar Rick infinito</button>
                    </div>


                ))}

                
            </div>
        </main>
    );
}

export default App;
