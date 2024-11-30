export default function LongStringDisplay({ text }: { text: string }) {
	return (
		<div className="w-full h-fit cursor-pointer relative text-left py-1 px-2 rounded-md border border-zinc-300">
			<p className="w-full h-fit truncate overflow-x-hidden peer select-all">{text}</p>

			<div className="invisible peer-hover:visible absolute h-fit max-w-full bottom-0 left-1/2 -translate-x-1/2 translate-y-full bg-zinc-900 z-10 border-zinc-300 border text-left break-words p-2 rounded-md">
				{text}
			</div>
		</div>
	);
}
