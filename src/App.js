import { api } from "./configs.js";
import React, { useState, useEffect } from "react";

function App() {
  const [id, setId] = useState("AU7102");
  const [tvs, setTvs] = useState([]);
  const [technologyies, setTechnologyies] = useState([]);
  const [current, setCurrent] = useState(0);
  const backdropRef = React.createRef();
  const navRef = React.createRef();
  const navButtonRef = React.createRef();

  const [module, setModule] = useState(false);
  const [moduleContent, setModuleContent] = useState([]);

  useEffect(() => {
    api.get("/tv.json")
      .then(res => setTvs(res.data))
      .catch(response => console.log(response))
  }, []);

  useEffect(() => {
    api.get("/technologyies.json")
      .then(res => setTechnologyies(res.data))
      .catch(response => console.log(response))
  }, []);

  function handleNavigation() {
    navButtonRef.current.classList.toggle("close");

    backdropRef.current.classList.toggle("hidden");
    backdropRef.current.classList.toggle("opacity-0");

    navRef.current.classList.toggle("left-0");
    document.body.classList.toggle("overflow-hidden");
  }

  return (
    <div>
      <nav ref={navRef}>
        <div className="flex row margin-x-auto">
          <div className="flex row center-start margin-r-64">
            <span className="font-weight-bold">4K</span>
            { tvs.map((tv, i) => {
              const name = tv.name.split("|")[0].trim();

              if (tv.type === "4K") {
                return <button className={`padding-y-8 padding-x-16 ${name === id ? "active" : ""}`.trim()} key={i} onClick={e => {
                  setCurrent(i);
                  setId(name);
                }}>{ name }</button>;
              }
            }) }
          </div>
          <div className="flex row center-start">
            <span className="font-weight-bold">8K</span>
            { tvs.map((tv, i) => {
              const name = tv.name.split("|")[0].trim();

              if (tv.type === "8K") {
                return <button className={`padding-y-8 padding-x-16 ${name === id ? "active" : ""}`.trim()} key={i} onClick={e => {
                  setCurrent(i);
                  setId(name);
                }}>{ name }</button>;
              }
            }) }
          </div>
        </div>
      </nav>
      { id && <div className="breadcrumb font-weight-bold margin-b-16 text-center">{ tvs.length > 0 && tvs[current].name }</div> }
      <div className="flex row wrap center">
        { tvs.length > 0 && tvs.map(tv => {
          if (id === tv.name.split("|")[0].trim()) {
            return tv.specifications.map((specs, i) => {
              return technologyies.some(tech => tech.name === specs[0] ? true : false)
                ? <button key={i} className="card margin-r-16--d min-width-375--d" onClick={() => { setModule(!module); setModuleContent(specs[0])}}>
                    <Card specs={specs}/>
                  </button>
                : <div key={i} className="card margin-r-16--d min-width-375--d">
                    <Card specs={specs}/>
                  </div>
              }
            )
          }
        })}
        </div>
      { module && <Module setModule={setModule} techs={technologyies} spec={moduleContent}/> }
      <div className="hidden backdrop opacity-0" ref={backdropRef} onClick={handleNavigation}></div>
    </div>
  );
}

function Card(props) {
  return (
    <React.Fragment>
      <span className="key">{props.specs[0]}</span>
      <span className="value">{props.specs[1]}</span>
    </React.Fragment>
  )
}

function Module(props) {
  const [currentTech, setCurrentTech] = useState(props.techs.find(tech => tech.name === props.spec));
  const backdropRef = React.createRef();

  function handleModule() {
    document.body.classList.remove("overflow-hidden");
    props.setModule(false);
  }

  useEffect(() => {
    document.body.classList.add("overflow-hidden");
  }, []);

  return (
    <React.Fragment>
      <div className="module">
        <button className="close-btn" onClick={handleModule}>X</button>
        { currentTech.image && <img src={`${!window.location.hostname.includes("jezstd.io") ? "/" : "./"}images/${currentTech.image}`} alt="sample_image" className="margin-t--48 margin-x--24 margin-b-16" /> }
        { currentTech.video && <video autoPlay playsInline muted loop className="margin-t--48 margin-x--24 margin-b-16">
          <source src={`${!window.location.hostname.includes("jezstd.io") ? "/" : "./"}images/${currentTech.video}`} />
        </video> }
        <h1 className="margin-b-16">{ currentTech.name }
          { currentTech.description && <span className="block font-size-16 font-weight-normal">{ currentTech.description }</span> }
        </h1>
          { currentTech.options && currentTech.options.map((option, i) => 
            <div key={i} className="margin-b-16">
              <span className="font-weight-bold">{option.name}</span>  
              <p>{option.description}</p>
            </div>
          )}
      </div>
      <div className="backdrop" ref={backdropRef} onClick={handleModule}></div>
    </React.Fragment>
  )
}

export default App;
