import React, { useEffect } from "react";
import { ReplaySubject } from "rxjs";

function ReplayComponent() {
  useEffect(() => {
    const subject = new ReplaySubject();
    console.log("Mount replay");
    subject.next(1);
    subject.next(2);
    subject.next(3);
    subject.subscribe(x => console.log(`second replay: ${x}`));
    subject.next(4);
    subject.next(5);
    return () => subject.complete();
  }, []);
  return (
    <div className="text-center mt-4 mb-4">
      <div className="row">
        <h2>Replay Subject</h2>
      </div>
      <div className="row">
        <p>See console...</p>
      </div>
    </div>
  );
}

export default ReplayComponent;
