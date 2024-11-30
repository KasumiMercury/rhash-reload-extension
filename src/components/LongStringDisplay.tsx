export default function LongStringDisplay({ text }: { text: string }) {
	return (
		<div className="w-full h-fit cursor-pointer relative">
			<p className="w-full h-fit truncate overflow-x-hidden peer">{text}</p>

			<div className="hidden peer-hover:block absolute h-fit max-w-full bottom-0 left-1/2 -translate-x-1/2 translate-y-full bg-zinc-900 z-10 border-zinc-50 border text-left break-words p-2 rounded-md">
				{text}
			</div>
		</div>
	);
}
