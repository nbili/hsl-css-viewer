import { useEffect, useState } from "react";
import Prism from "prismjs";

import { ColorWheel, parseColor } from "./ColorWheel";
import { ColorSlider } from "./ColorSlider";

import "prismjs/themes/prism-okaidia.css";
import "./App.css";

function App() {
  const [h, setH] = useState(parseColor(`hsl(0, 50%, 50%)`));
  const [s, setS] = useState(parseColor(`hsl(0, 50%, 50%)`));
  const [l, setL] = useState(parseColor(`hsl(0, 50%, 50%)`));
  const [a, setA] = useState(parseColor(`hsl(0, 50%, 50%)`));

  useEffect(() => {
    Prism.highlightAll();
  }, [h, s, l, a]);

  const hue = h.toString("hsl").split(",")[0].slice(4);
  const saturation = s.toString("hsl").split(",")[1].slice(0, -1);
  const lightness = l.toString("hsl").split(",")[2].slice(0, -2);

  const alpha = a.toString("hsla").split(",")[3].slice(0, -1);

  return (
    <div className="App">
      <h1>H S L</h1>
      <div className="container">
        <div className="hsl">
          <div className="hue">
            <ColorWheel defaultValue={h} onChange={setH} />

            <p className="info">
              <label>
                <strong>deg(0 - 360°): </strong>
                {hue} °
              </label>
            </p>
          </div>

          <div className="sl">
            <div className="saturation">
              <ColorSlider
                channel="saturation"
                defaultValue={s}
                onChange={setS}
              />
            </div>

            <div className="lightness">
              <ColorSlider
                channel="lightness"
                defaultValue={l}
                onChange={setL}
              />
            </div>

            <div className="alpha">
              <ColorSlider
                channel="alpha"
                defaultValue={a}
                onChange={setA}
              />
            </div>
          </div>
        </div>

        <div className="code">
          <div
            className="box"
            style={{
              backgroundColor: `hsl(${hue} ${saturation}% ${lightness}% / ${alpha})`,
            }}
          ></div>

          <pre>
            <code className={`language-css`}>{`
.box {
  background-color: hsl(${hue} ${saturation}% ${lightness}% / ${alpha});
}
            `}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}

export default App;
