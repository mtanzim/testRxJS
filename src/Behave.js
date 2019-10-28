import React, { useEffect } from "react";
import { BehaviorSubject } from "rxjs";

function Behave() {
  useEffect(() => {
    const subject = new BehaviorSubject();
    console.log("Mount behave");
    subject.next(1);
    subject.subscribe(x => console.log(`first behave: ${x}`));
    subject.next(2);
    subject.next(3);
    subject.subscribe(x => console.log(`second behave: ${x}`));
    subject.next(4);
    subject.next(5);
    return () => subject.complete();
  }, []);
  return (
    <div className="text-center mt-4 mb-4">
      <div className="row">
        <h2>Behavior Subject</h2>
      </div>
      <div className="row">
        <p>See console...</p>
      </div>
    </div>
  );
}

export default Behave;
