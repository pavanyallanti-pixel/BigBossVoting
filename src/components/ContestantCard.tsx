
import { Phone, Heart } from 'lucide-react';
import { Contestant } from '../data/contestants';

interface ContestantCardProps {
    contestant: Contestant;
}

export const ContestantCard = ({ contestant }: ContestantCardProps) => {
    return (
        <div className="card group relative overflow-hidden">
            <div className="flex flex-col items-center text-center">
                <div className="relative mb-4">
                    <div className="w-32 h-32 rounded-full p-1 bg-white shadow-md">
                        <img
                            src={contestant.imageUrl}
                            alt={contestant.name}
                            className="w-full h-full rounded-full object-cover"
                            loading="lazy"
                        />
                    </div>
                    <div className={`absolute bottom-0 right-0 w-8 h-8 rounded-full flex items-center justify-center border-2 border-white ${contestant.status === 'active' ? 'bg-green-500' : 'bg-red-500'}`}>
                        <span className="sr-only">{contestant.status}</span>
                    </div>
                </div>

                <h3 className="text-lg font-bold mb-1">{contestant.name}</h3>
                <p className="text-gray-500 text-sm mb-4 flex items-center gap-1">
                    <Phone className="w-3 h-3" /> {contestant.phone}
                </p>

                <div className="w-full pt-4 border-t border-gray-100 flex items-center justify-between">
                    <div className="text-left">
                        <p className="text-xs text-gray-400">Current Votes</p>
                        <p className="font-bold text-primary-600">{contestant.voteCount?.toLocaleString()}</p>
                    </div>
                    <button className="btn btn-primary py-2 px-4 text-xs gap-2">
                        <Heart className="w-3 h-3" /> Vote
                    </button>
                </div>
            </div>
        </div>
    );
};
