export default function LongStringDisplay({ text }: { text: string }) {
	return (
		<div className="h-fit w-full cursor-pointer rounded-md border border-zinc-300 px-2 py-1 text-left">
			<p className="h-fit w-full select-all overflow-x-hidden whitespace-nowrap hover:overflow-x-auto hover:whitespace-normal hover:break-all">
				{text}
			</p>
		</div>
	);
}
