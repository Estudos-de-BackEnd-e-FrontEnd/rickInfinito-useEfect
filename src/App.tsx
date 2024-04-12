import axios from "axios";
import { useEffect, useState } from "react";
import {v4 as uuid} from "uuid"

interface Character{
    id: string
    name: string;
    status: string;
    species: string;
    image: string
}

function App() {
    const [isVisible, setIsVisible] = useState(true)
    const [data, setData] = useState<Character[]>([])
    const [count, setCount] = useState<number>(0)

    
    useEffect(()=>{
        async function getData (){
            try {
                const dataApi = await axios.get("https://rickandmortyapi.com/api/character")

                const {name, species, status, image} = dataApi.data.results[0]
                
                const newCharacter: Character = {
                    id: uuid(),
                    name,
                    species,
                    status,
                    image
                }  

                setData((currentValue)=> [newCharacter, ...currentValue])

            } catch (error) {
                console.log(error)
            }
        }
        getData()


    },[count])

    useEffect(()=> {
        return () => {
            console.log("Abortando a solicitação de dados...");
                setData([])
            console.log("Solicitação de dados abortada com sucesso.");
        };
    },[isVisible])

    console.log("rerender")
    return (
        <main className="container-fluid justify-content-center text-center p-0">

            <div className="container-fluid text-bg-success">
                <h1>InfinityRick</h1>
            </div>
            
            <div className="container d-flex justify-content-center flex-wrap" >
                {isVisible && data?.map((item) =>(
                    <div className="border rounded border-success m-2 p-2 text-bg-success" key={item.id}>
                        <img className="w-75"  src={item.image}/>
                        <h1><u>{item.name}</u></h1>
                        <p>{item.species}</p>
                        <p>{item.status}</p>
                        <br/>
                        <button className="btn btn-light mb-2" onClick={()=> setCount((counter)=> counter  + 1)}>Clicar</button>
                        <button className="btn btn-danger" onClick={()=> setIsVisible(false)}>Limpar Rick infinito</button>
                    </div>

                ))}
            </div> 
        </main>
    );
}


export default App