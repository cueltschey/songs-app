

interface Props{
  addNewSong : Function;
}

const Add = ({addNewSong}: Props) => {
  
  async function handleOnChange(e: React.FormEvent<HTMLInputElement>) {
    const target = e.target as HTMLInputElement & {
      files : FileList;
    }
    for(let i = 0; i < target.files.length; i++){
      const formdata = new FormData()
    
      formdata.append('file', target.files[i])
      formdata.append('upload_preset', "songs-app-unsigned")
      formdata.append('api_key', "112399833897472")
      formdata.append('resource_type','video')

      const results = await fetch('https://api.cloudinary.com/v1_1/dbmuyu02a/video/upload', {
        method: 'POST',
        body: formdata
      }).then(r => r.json());
      let artist = results.original_filename.split('-')[0]
      let song = results.secure_url
      let name = results.original_filename.split('-')[1]
      addNewSong(artist, song, name)
    }
  }
  
  return (
    <div id='addfile'>
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text" id="inputGroupFileAddon01">Add Song</span>
        </div>
        <div className="custom-file">
          <input type="file" className="custom-file-input" id="inputGroupFile01" accept="audio/mpeg" multiple onChange={handleOnChange}/>
        </div>
      </div>
    </div>
  )
}

export default Add