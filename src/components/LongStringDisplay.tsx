export default function LongStringDisplay({ text }: { text: string }) {
    return (
        <div className="w-full h-fit cursor-pointer relative">
            <p className="w-full h-fit truncate overflow-x-hidden">{text}</p>
        </div>
    );
}