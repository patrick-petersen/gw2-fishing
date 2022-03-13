import React from 'react';
import './App.css';
import Area from "./UI/Area";
import Pools from "./UI/Pools";
import Pool from "./UI/Pool";
import TimeBlock from "./UI/TimeBlock";
import Fish from "./UI/Fish";

function App() {
  return (
    <Area name={"Dragons End"}>
      <Pools>
          <Pool name={"None"}>
              <TimeBlock name={"Day"} start={"8:00"} end={"19:00"}>
                  <Fish name={"Some Day Fish"} bait={"Some Bait"} />
                  <Fish name={"Some Day Fish"} bait={"Some Bait"} />
                  <Fish name={"Some Day Fish"} bait={"Some Bait"} />
              </TimeBlock>
              <TimeBlock name={"Night"} start={"20:00"} end={"07:00"}>
                  <Fish name={"Some Night Fish"} bait={"Some Bait"} />
              </TimeBlock>
          </Pool>
          <Pool name={"Deep"}>
              <TimeBlock name={"Day"} start={"8:00"} end={"19:00"}>
                  <Fish name={"Some Day Fish"} bait={"Some Bait"} />
              </TimeBlock>
              <TimeBlock name={"Night"} start={"20:00"} end={"07:00"}>
                  <Fish name={"Some Night Fish"} bait={"Some Bait"} />
              </TimeBlock>
          </Pool>
      </Pools>
    </Area>
  );
}

export default App;
