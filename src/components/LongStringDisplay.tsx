export default function LongStringDisplay({ text }: { text: string }) {
	return (
		<div className="w-full h-fit cursor-pointer text-left py-1 px-2 rounded-md border border-zinc-300">
			<p className="w-full h-fit overflow-x-hidden whitespace-nowrap select-all hover:break-all hover:overflow-x-auto hover:whitespace-normal">
				{text}
			</p>
		</div>
	);
}
