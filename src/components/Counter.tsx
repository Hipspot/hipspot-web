import React, { useState } from 'react';
import styled from '@emotion/styled';

const H1 = styled('h1')`
	color: green;
`;

function Counter() {
	const [count, setCount] = useState(0);
	const onIncrease = () => setCount(count + 1);
	const onDecrease = () => setCount(count - 1);
	return (
		<div>
			<H1>{count}</H1>
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
