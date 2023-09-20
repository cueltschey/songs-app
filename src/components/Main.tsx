
interface Props{
  index : number;
  artists : string[];
  songs : [string[]][];
}

const Main = ({index, artists, songs}:Props) => {
  if(songs.length < 1){
    return(<p>Input songs</p>)
  }
    return(
      <ul className="list-group" id="songlist">
        <h1> {artists[index]}</h1>
        {songs[index].map((song , index, songsArray) => (
          <li className="list-group-item" id="songdisplay">
            <div className="row content-align-center">
              <div className="col">
                <h4 id="songtitle">{songsArray[index][1]}</h4>
              </div>
              <div className="col">
                <audio controls id="player" src={songsArray[index][0]}></audio>
              </div>
            </div>
          </li>
        ))}

      </ul>
    )
  }

export default Main