import { ChangeEvent } from 'react'
import mainimage from './components/assets/foggy_forest.jpg'
import Main from "./components/Main.tsx"
import Home from "./components/Home.tsx"
import Add from "./components/Add.tsx"
import SearchResult from './components/SearchResult.tsx'
import { useState } from "react"

function renderMain(index : number, songsData : any, artistData : string[]) {
  return <Main index={index} artists={artistData} songs={songsData}></Main>
}
let navoptions = ['Home','My Songs','Add songs']

const songsData : [string[]][] = []
const artistsData : string[] = []

const addNewSong = (newArtist : string, newSongFile : string, newSongName : string) => {
  if(artistsData.indexOf(newArtist) !== -1){
    songsData[artistsData.indexOf(newArtist)].push([newSongFile, newSongName])
  }
  else{
      songsData.push([[newSongFile, newSongName]])
      artistsData.push(newArtist)
    }
  }


function App() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [mainIndex, setMainIndex] = useState(0)
  const [query, setQuery] = useState("search...")
  const [found, setFound] = useState(false)
  const [songFound, setSongFound] = useState('')
  function findQuery(event : ChangeEvent<HTMLInputElement>) {
    const {target} = event
    setQuery(target.value)
  }
  const searchSongs = (query : string) => {
    for(let a = 0; a < songsData.length; a++){
      for(let t = 0; t < songsData[a].length; t++){
        if((' ' + query) === songsData[a][t][1]){
          return songsData[a][t][0]
        }
      }
    }
    console.log('not found')
    return ''
  }
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if(event.key === "Enter"){
      let result = searchSongs(query)
      if(result){
        setFound(true)
      }
      else{setFound(false)}
      setSongFound(result)
    }
  }
  return (
    <>
      <div className='row align-items-start' id='navbar'>
      <img src={mainimage} height='50' width='70' className="img-fluid"/>
        <div className='col-10 col-md-4'>
          <input
          type={'search'} 
          className='form-control ds-input' 
          placeholder={query} 
          id="search" 
          onChange={findQuery}
          onKeyDown={handleKeyDown}
          />
          <SearchResult found={found} songFound={songFound}></SearchResult>
          </div>
        <div className='col-12 col-sm-6 col-md-8'>
          <div className="navbar navbar-expand-lg navbar-light bg-light" id="navigation">
            <ul className="nav nav-tabs">
              {navoptions.map((item, index) => (
                  <li>
                  <a
                  className={currentIndex === index ? 'nav-link active' : 'nav-link'}
                  onClick={() => {
                      setCurrentIndex(index)
                  }}
                  >
                      {item}
                  </a>
                  </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {currentIndex === 0 ? <Home />
      : currentIndex === 1 ? 
      <div className="row align-items-start">

      <div className='col-10 col-md-4'>
          <div className='container'>
            <ul className="list-group">
                {artistsData.map((item, index) => (
                  <li
                  className={index === mainIndex ? "list-group-item active" : "list-group-item"}
                  onClick={() => {setMainIndex(index)}}
                  >
                    {item}
                  </li>
                ))}
                <li
                className="list-group-item"
                onClick={() => {setCurrentIndex(2)}}
                >
                  + Add new artist
                </li>
            </ul>
          </div>
      </div>

      <div className='col-12 col-md-8'>
        {renderMain(mainIndex, songsData, artistsData)}
      </div>
    </div>
      
      
      :<div>
        <Add addNewSong={addNewSong}/>
      </div>}
      
    </>
  )
}

export default App
