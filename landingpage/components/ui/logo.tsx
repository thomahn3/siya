import { Hammer } from 'lucide-react';


export default function Logo() {
    return (
        <div className="flex flex-row items-center leading-none text-green-500">
            <Hammer size={32} strokeWidth={1.5}/>
            <p className="font-Title text-[30px] italic font-semibold">
                SIYA
            </p>
        </div>
    );
}