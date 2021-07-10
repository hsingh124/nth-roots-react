import JXG from 'jsxgraph'
import { complex, nthRoots } from 'mathjs';
import { useEffect, useState } from 'react';

export const NthRoots = () => {

	const [numOfRoots, setNumOfRoots] = useState(2);
	const [numOfRootsText, setNumOfRootsText] = useState(2)

	const handleChange = (e) => {
		setNumOfRootsText(e.target.value)
	}

	const handleSubmit = (e) => {
		setNumOfRoots(numOfRootsText)
		e.preventDefault();
	}

	useEffect(() => {
		const board = JXG.JSXGraph.initBoard('box', { boundingbox: [-6, 6, 8, -4], axis: true });

		let x = board.create('point', [-2, 2], { style: 5, color: 'blue', name: 'x' });
		let z = nthRoots(complex(x.X(), x.Y()), numOfRoots);

		z.forEach((root, index) => {
			board.create('point', [() => z[index].re, () => z[index].im])
		})

		board.on('hit', function (evt, el) {
			z = nthRoots(complex(x.X(), x.Y()), numOfRoots);
		});

	}, [numOfRoots])

	return (
		<div>
			<div id="box" class="jxgbox" style={{ width: 500, height: 500 }} />
			<form onSubmit={handleSubmit}>
				<label>
					Number of Roots:
					<input type="text" value={numOfRootsText} onChange={handleChange} />
				</label>
				<input type="submit" value="Submit" />
			</form>
		</div>
	)
}