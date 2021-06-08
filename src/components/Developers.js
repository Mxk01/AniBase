 import React,{useState,useEffect} from 'react';
import './Developers.css';
import FadeIn from 'react-fade-in'; 

function Developers() {
  
  let [anime,setAnime] = useState([]);
  let [input,setInput] = useState('');

  useEffect(() => {
    fetch(`https://kitsu.io/api/edge/anime`).then(res => res.json())
    .then((info)=>{
      setAnime(info.data);
     })
  
  },[])

  let filterAnime = (e) => {
    setInput('');

    let value = e.target.value;
    fetch(`https://kitsu.io/api/edge/anime?filter[categories]=${value}`).then(res => res.json())
    .then((info)=>
    {
      setAnime(info.data)
    }
    
    )
  }

    let sortAnime = (e)=>
    {
            
                // filter === "lowest" ? a.price > b.price ? 1 : -1  : filter === "highest"
        //  ? a.price < b.price ? 1 : -1 
         setInput('');
        switch(e.target.value)
        {

            case 'ascending':
          let ascendingSortedAnime = anime.slice()
         .sort((a,b)=> a.attributes.canonicalTitle > b.attributes.canonicalTitle ? 1 : -1 );
          setAnime(ascendingSortedAnime)
          break;

          case 'descending':
            let  descendingSortedAnime = anime.slice()
           .sort((a,b)=> a.attributes.canonicalTitle > b.attributes.canonicalTitle ? -1 : 1 );
             setAnime(descendingSortedAnime)
            break;
        default:
           setAnime(anime);
        }
          
              
  
  }

  let searchAnime = (e) => {
    e.preventDefault();
    setInput(e.target.value);
    fetch(`https://kitsu.io/api/edge/anime?filter[text]=${e.target.value}`).then(res => res.json())
    .then((info)=>
    {
      setAnime(info.data)
    })
  }


  let categoryFind = (category) => {
    setInput('');

    
    fetch(`https://kitsu.io/api/edge/anime?filter[categories]=${category}`).then(res => res.json())
    .then((info)=>
    {
      setAnime(info.data)
    }
    
    )
  }


  let categories = ['Horror','Romance','Drama','Adventure','Action','SciFi'];
  let i=0;
 
    return (
        <div className="dev__mainContainer">
          
          
        <div className="categories__container" 
         style={{display:'flex',flexDirection:'column',zIndex:'1'}}>
            {
               
               categories.map(category => {
               return (
               <button key={i++} onClick={(e)=>{ categoryFind(category) }}
                  style={{margin:'15px',
                          borderRadius:'2rem',
                          padding:'10px',
                          border:'0',
                          width:'150px'}}> {category}</button>
                          )
               })
              }
        </div>
                 <div className="selects__container"> 

                
                        <select   onChange={(e)=>{filterAnime(e)}}> 
                 <option value="Adventure">Adventure</option>
                <option value="Action">Action</option>
                <option value="Romance">Romance</option>
                <option value="Isekai">Isekai</option>
                <option value="Horror">Horror</option>
                <option value="Sports">Sports</option>
            </select>
              {'  '}
            <select   onChange={(e)=> sortAnime(e) }> 
                 <option value="ascending">ascending</option>
                <option value="descending">descending</option>
            </select>
          
            </div>
            
       <FadeIn delay={60}> 
       <div className="column__items" style={{display:'flex'}}> 
       {/* <p style={{marginLeft:'20px',marginRight:'5px'}}>There are {anime.length} anime available to watch !</p> */}
       <input type="text"
       value={input} 
       style={{outline:'none',border:'none',borderBottom:'3px solid red',
                 width:'100px',marginLeft:'60px'
                }} onChange={(e)=>searchAnime(e)}/>
                 </div>

       <div className="anime"> 
       {
         anime.map((dev)=> {
         return(
            <div key={dev.id}>
            <h3 style={{display:'flex',flexWrap:'wrap',width:'150px'}}>{dev.attributes.canonicalTitle}</h3>
            <div className="statuses">
            {dev.attributes.status==='finished' ? (<h4 style={{
                         backgroundColor:'#4834d4',
                         padding:'8px',
                         borderRadius:'25px',
                         fontSize:'x-small',
                         color:'white'}}>Finished</h4>):'' }
            { dev.attributes.averageRating > 60 ? (<h4>Average rating : {dev.attributes.averageRating}</h4>) :
            (<h4 style={{
                         backgroundColor:'#eb4d4b',
                         padding:'8px',
                         borderRadius:'25px',
                         fontSize:'x-small',
                         color:'white'}}>Low rated</h4>) 
         }
         </div>
            <img className="avatar" src={dev.attributes.posterImage.tiny} alt={dev.attributes.ratingRank} />
          {
           dev.attributes.synopsis.length > 250 ? (<p>{dev.attributes.synopsis.substring(0,dev.attributes.synopsis.length-200)}...</p>):
           (<p>{dev.attributes.synopsis}</p>)
            
          }
            <p>Popularity rank : <strong> {dev.attributes.popularityRank} </strong></p>
            <a 
            style={{textDecoration:'none',color:'black',padding:'5px',backgroundColor:'#f9ca24'
          ,borderRadius:'30px'}}
            href={`https://www.youtube.com/watch?v=${dev.attributes.youtubeVideoId}`}>Find out more</a> {/*Change later with router*/}
            </div>
            )
        })
      }
        </div>


       </FadeIn>
        </div>
    )
}

export default Developers
