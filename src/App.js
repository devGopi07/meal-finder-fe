 
import "./App.css"; 
import {  useState } from "react"; 
import { Button, Card } from "react-bootstrap";
import axios from "axios";   

function App() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState(null); 

  async function getdata() {
    if (search) {
      var res = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`
      );
      setData(res.data.meals);
      console.log(data);
      if (data === null) {
        alert("No Food Found");
      }
    } else {
      alert("Enter a food name to search");
    }
  }

  // useEffect(() => {
  //   getdata()
  // }, [])
  console.log(data);

  return (
    <div className="App">
      <div className="main-outer">
        <h1 className="heading">Meal Finder</h1>
        <div className="inp-button">
          <div className="searchdiv">
            <input
              className="searchbox"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Dishes"
            />
          </div>
          <div className="searchbutton"> 
            <Button style={{backgroundColor:"black",color:"white"}} variant="contained" onClick={() => getdata()}>
              Search
            </Button>
          </div>
        </div>

        <div className="result-container">
          {data !== null
            ? data.map((val, idx) => {
                console.log(val.strMeal);
                return (
                  <Card className="result-single-card" key={idx}  style={{ textAlign:"center" }}>
                    <Card.Img
                      style={{ width: "200px" }}
                      variant="top"
                      src={val.strMealThumb}
                    />
                    <Card.Body style={{ textAlign: "center" }}>
                      <Card.Text>
                        {" "}
                        <b>{val.strMeal}</b>{" "}
                      </Card.Text>
                      <Button style={{backgroundColor:"black",color:"white"}} variant="contained"> <a target="blank" style={{color:"white",textDecoration:"none"}} href={val.strYoutube}>Watch</a></Button>
                    </Card.Body>
                  </Card>
                );
              })
            : ""}
        </div>
      </div>
    </div>
  );
}

export default App;

// {data !== null
//   ? data.map((da, idx) => {
//       return (
//         <div key={idx} className="result-single-card">
//           <Card>
//             {/* <Card.Img variant="top" src={da[idx].strMeal} /> */}
//             <Card.Body>
//               <Button variant="contained">{idx}</Button>
//               <Button variant="contained">Watch</Button>
//             </Card.Body>
//           </Card>
//         </div>
//       );
//     })
//   : ""}
