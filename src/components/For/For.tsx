import React from "react";

type Props<T> = {
	items: T[];
	render: (item: T, index: number) => React.ReactNode;
	fallback?: React.ReactNode;
};

export default function For<T>({ items, render, fallback }: Props<T>) {
	return (
		<>
			{items && items.length > 0
				? items.map((item, index) => render(item, index))
				: fallback}
		</>
	);
}
