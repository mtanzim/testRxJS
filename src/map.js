import React, { useEffect, useState } from "react";
import { interval, of } from "rxjs";
import { map, take, filter, mergeMap, switchMap } from "rxjs/operators";

const numbers$ = interval(500).pipe(
  take(10),
  map(x => x * 3),
  filter(x => x % 5 !== 0)
);
const letters$ = of("a", "b", "c").pipe(
  mergeMap(x =>
    numbers$.pipe(
      take(5),
      map(i => x + i)
    )
  )
);
const lettersSwitch$ = of("a", "b", "c").pipe(
  switchMap(x =>
    numbers$.pipe(
      take(5),
      map(i => x + i)
    )
  )
);
function MapComponent() {
  const [curVal, setVal] = useState("...Starting MergeMap");
  const [curSVal, setSVal] = useState("...Starting SwitchMap");
  useEffect(() => {
    console.log("Mount map");
    lettersSwitch$.subscribe(x => setVal(prevVal => `${prevVal} ${x}`));
    letters$.subscribe(x => setSVal(prevVal => `${prevVal} ${x}`));
    return () => numbers$.unsubscribe();
  }, []);
  return (
    <div className="text-center mt-4 mb-4">
      <div className="row">
        <h2>Map Example</h2>
      </div>
      <div className="row">
        <p>{curVal}</p>
      </div>
      <div className="row">
        <p>{curSVal}</p>
      </div>
    </div>
  );
}

export default MapComponent;
