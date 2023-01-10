import { css } from "@emotion/react";
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);
  const onIncrease = () => setCount(count + 1);
  const onDecrease = () => setCount(count - 1);

  return (
    <div>
      <h1
        css={css`
          font-size: 1rem;
          color: red;
        `}
      >
        {count}
      </h1>
      <div>
        <button type="button" onClick={onIncrease}>
          +1
        </button>
        <button type="button" onClick={onDecrease}>
          -1
        </button>
      </div>
    </div>
  );
}

export default Counter;
