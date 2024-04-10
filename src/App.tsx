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
        <main className="container-fluid justify-content-center text-center p-0">
            <div className="container-fluid text-bg-success">
                <h1 >InfinityRick</h1>
            </div>
            
            <div className="container d-flex justify-content-center flex-wrap" >
                {data.map((item: Character, index) =>(
                    <div className="border rounded border-success m-2 p-2 text-bg-success" key={item.id + index }>
                        <img className="w-75"  src={item.image}/>
                        <h1><u>{item.name}</u></h1>
                        <p>{item.species}</p>
                        <p>{item.status}</p>
                        <button className="btn btn-light mb-2" onClick={()=> setCount((prevCount)=> prevCount + 1)}>Clicar</button>
                        <br/>
                        <button className="btn btn-danger" onClick={clear}>Limpar Rick infinito</button>
                    </div>


                ))}
            </div>
        </main>
    );
}

export default App;
