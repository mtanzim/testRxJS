import React, { useState, useEffect } from "react";
import { Subject } from "rxjs";

const subject = new Subject();
const subscriptions = [
  subject.subscribe(x => console.log(`first: ${x}`)),
  subject.subscribe(x => console.log(`second: ${x}`)),
  subject.subscribe(x => console.log(`third: ${x}`))
];

function SubjectComponent() {
  const [subs, setSubs] = useState([true, true, true]);
  useEffect(() => {
    return () => subject.complete();
  }, []);
  return (
    <div className="text-center mt-4 mb-4">
      <div className="row">
        <h2>Subject</h2>
      </div>
      <div className="row">
        <button
          className="btn btn-danger"
          onClick={() => subject.next(Math.floor(Math.random() * 50) + 50)}
        >
          Next
        </button>
        {[0, 1, 2].map((item, idx) => (
          <button
            disabled={!subs[idx]}
            onClick={() => {
              setSubs(prevSub => {
                const newSub = [...prevSub];
                console.log(newSub);
                newSub[idx] = false;
                return newSub;
              });
              subscriptions[item].unsubscribe();
            }}
            key={idx}
            className={`ml-2 btn btn-primary`}
          >{`Unsub ${idx}`}</button>
        ))}
      </div>
    </div>
  );
}

export default SubjectComponent;
