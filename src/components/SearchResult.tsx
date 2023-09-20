interface Props{
    found : boolean;
    songFound : string;
}

const SearchResult = ({found, songFound}:Props) => {
  return (
    <div
    className= {found ? "list-group-item" : "hiddenResult"}
    >
        <audio controls src={songFound}></audio>
    </div>
  )
}

export default SearchResult