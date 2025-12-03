export interface Contestant {
    id: number;
    name: string;
    phone: string;
    initials: string;
    color: string;
    imageUrl: string;
    status: 'active' | 'eliminated';
    voteCount?: number;
}

export const contestants: Contestant[] = [
    {
        id: 1,
        name: "Diya Nikhita",
        phone: "+91 88866 50465",
        initials: "DN",
        color: "linear-gradient(135deg, #FF6B6B 0%, #FF8E72 100%)",
        imageUrl: "https://hfphvsuqrlqeiozyltml.supabase.co/storage/v1/object/public/contestants_avatar/Divya-Nikhita-Bigg-boss-9-telugu-voting.webp",
        status: 'active',
        voteCount: 1250
    },
    {
        id: 2,
        name: "Sanjana Gairani",
        phone: "+91 88866 50460",
        initials: "SG",
        color: "linear-gradient(135deg, #4ECDC4 0%, #44A08D 100%)",
        imageUrl: "https://hfphvsuqrlqeiozyltml.supabase.co/storage/v1/object/public/contestants_avatar/Bigg-Boss-9-Telugu-Voting-Sanjana-Galrani.webp",
        status: 'active',
        voteCount: 980
    },
    {
        id: 3,
        name: "Demon Pavan",
        phone: "+91 88866 50451",
        initials: "DP",
        color: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        imageUrl: "https://hfphvsuqrlqeiozyltml.supabase.co/storage/v1/object/public/contestants_avatar/Bigg-Boss-9-Telugu-Voting-Demon-Pavan.webp",
        status: 'active',
        voteCount: 1500
    },
    {
        id: 4,
        name: "Bharani",
        phone: "+91 88866 50450",
        initials: "B",
        color: "linear-gradient(135deg, #F093FB 0%, #F5576C 100%)",
        imageUrl: "https://hfphvsuqrlqeiozyltml.supabase.co/storage/v1/object/public/contestants_avatar/Bigg-Boss-9-Telugu-Voting-Bharani.webp",
        status: 'active',
        voteCount: 850
    },
    {
        id: 5,
        name: "Suman Shetty",
        phone: "+91 888 66 50 463",
        initials: "SS",
        color: "linear-gradient(135deg, #4DB8FF 0%, #0099FF 100%)",
        imageUrl: "https://hfphvsuqrlqeiozyltml.supabase.co/storage/v1/object/public/contestants_avatar/Bigg-Boss-9-Telugu-Voting-Suman-Shetty.webp",
        status: 'active',
        voteCount: 1100
    },
    {
        id: 6,
        name: "Emmanuel",
        phone: "+91 88866 50452",
        initials: "E",
        color: "linear-gradient(135deg, #FFB347 0%, #FFA500 100%)",
        imageUrl: "https://hfphvsuqrlqeiozyltml.supabase.co/storage/v1/object/public/contestants_avatar/Bigg-Boss-9-Telugu-Voting-Emmanuel.webp",
        status: 'active',
        voteCount: 920
    },
    {
        id: 7,
        name: "Kalyan Padala",
        phone: "+91 88866 50455",
        initials: "KP",
        color: "linear-gradient(135deg, #95E1D3 0%, #38ADA9 100%)",
        imageUrl: "https://hfphvsuqrlqeiozyltml.supabase.co/storage/v1/object/public/contestants_avatar/Bigg-Boss-9-Telugu-Voting-Kalyan-Padala.webp",
        status: 'active',
        voteCount: 1350
    },
    {
        id: 8,
        name: "Thanuja Puttasswamy",
        phone: "+91 888 66 50 464",
        initials: "TP",
        color: "linear-gradient(135deg, #E0C3FC 0%, #8EC5FC 100%)",
        imageUrl: "https://hfphvsuqrlqeiozyltml.supabase.co/storage/v1/object/public/contestants_avatar/Bigg-Boss-9-Telugu-Voting-Thanuja-Puttasswamy.webp",
        status: 'active',
        voteCount: 1050
    }
];
