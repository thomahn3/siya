import { Hammer } from 'lucide-react';

export default function Logo() {

    return (
        <div className="flex flex-row self-center leading-none text-green-500 justify-center items-center">
            <Hammer size={28} strokeWidth={1.5}/>
            <p className="font-Title text-[30px] italic font-semibold">
                SIYA
            </p>
        </div>
    );
}