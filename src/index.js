// import React, { useState } from "react";
import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
// import Observer from "./Observer";
// import SubjectComponent from "./Subject";
// import ReplayComponent from "./Replay";
// import Behave from "./Behave";
// import TakeComponent from "./take";
// import MapComponent from "./map";

import { Subject } from "rxjs";
import { debounceTime, distinctUntilChanged, switchMap } from "rxjs/operators";
import "./styles.css";

async function fetchData(query) {
  const api = `https://www.reddit.com/r/aww/search.json?q=${query}`;
  const res = await fetch(api);
  const result = res.json();
  return result;
}

function App() {
  const searchSubject$ = useRef(new Subject());
  const [inputVal, setVal] = useState("");
  const [results, setResults] = useState([]);
  useEffect(() => {
    const s$ = searchSubject$.current;
    s$.pipe(
      debounceTime(750),
      distinctUntilChanged(),
      switchMap(query => fetchData(query))
    ).subscribe(res => {
      // console.log(`debounced: ${JSON.stringify(res)}`);
      // setResults(res.children.map(item => item.data.title));
      setResults(
        res["data"]["children"]
          .filter((a, i) => i < 5)
          .map(a => a["data"]["title"])
      );
      // console.log(`debounced: ${JSON.stringify(res)}`);
    });
    return () => s$.unsubscribe();
  }, []);
  return (
    <div className="container">
      <div className="jumbotron">
        <h1>RxJS Patterns</h1>
      </div>
      {/* <Observer /> */}
      {/* <SubjectComponent /> */}
      {/* <Behave /> */}
      {/* <ReplayComponent /> */}
      {/* <TakeComponent /> */}
      {/* <MapComponent /> */}
      <h2>Dynamic Search on Reddit With RxJS</h2>
      <input
        className="mb-4 mt-4"
        onChange={e => {
          setVal(e.target.value);
          searchSubject$.current.next(e.target.value);
          // console.log(inputVal);
        }}
        value={inputVal}
      />
      {/* {results && <p>{JSON.stringify(results)}</p>} */}
      {results.length > 0 ? (
        <ul>
          {results.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      ) : (
        <p>Start entering text to search...</p>
      )}
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
