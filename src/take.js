import React, { useEffect, useState } from "react";
import { interval } from "rxjs";
import { take } from "rxjs/operators";

const numbers$ = interval(500).pipe(take(10));
function TakeComponent() {
  const [curVal, setVal] = useState("...Starting");
  useEffect(() => {
    console.log("Mount take");
    numbers$.subscribe(x => setVal(prevVal => `${prevVal} ${x}`));
    return () => numbers$.unsubscribe();
  }, []);
  return (
    <div className="text-center mt-4 mb-4">
      <div className="row">
        <h2>Take Example</h2>
      </div>
      <div className="row">
        <p>{curVal}</p>
      </div>
    </div>
  );
}

export default TakeComponent;
