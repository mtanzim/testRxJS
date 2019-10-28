import React, { useEffect, useState } from "react";
import { Observable } from "rxjs";

const observable$ = Observable.create(observer => {
  const interval = setInterval(() => {
    const curVal = Math.floor(Math.random() * 50) + 50;
    if (curVal % 3 === 0) {
      observer.error(`Uh oh on ${curVal}`);
    }
    observer.next(curVal);
  }, 300);

  setTimeout(() => {
    observer.complete();
    clearInterval(interval);
  }, 5000);
});

function Observer() {
  const [isStarted, setStarted] = useState(false);
  const [curVal, setVal] = useState("...");

  useEffect(() => {
    if (isStarted) {
      try {
        observable$.subscribe(
          value => {
            console.log(value);
            setVal(value);
          },
          err => {
            setVal(err);
            observable$.unsubscribe();
            console.log(err);
          },
          () => {
            console.log("this is the end");
            setVal("Complete");
            console.log("Unsubbed");
            observable$.unsubscribe();
          }
        );
      } catch (err) {
        console.log(err);
      }
    }
  }, [isStarted]);

  return (
    <div className="text-center mt-4 mb-4">
      <div className="row">
        <h2>Observer</h2>
      </div>
      <div className="row">
        <p className="col">{curVal}</p>
        <div className="col">
          {!isStarted && (
            <button className="btn btn-danger" onClick={() => setStarted(true)}>
              Start
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Observer;
