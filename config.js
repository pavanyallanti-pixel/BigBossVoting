// Configuration Module - Load all environment variables

const CONFIG = {
  // Week Configuration
  weekNumber: import.meta.env.VITE_WEEK_NUMBER || '12',

  // Supabase Configuration
  supabase: {
    url: import.meta.env.VITE_SUPABASE_URL || '',
    key: import.meta.env.VITE_SUPABASE_KEY || ''
  },

  // Voting Polls (StrawPoll IDs)
  polls: {
    id1: import.meta.env.VITE_STRAWPOLL_ID_1 || 'NMnQBXAQAg6',
    id2: import.meta.env.VITE_STRAWPOLL_ID_2 || 'NMnQBXAQAg6',
    id3: import.meta.env.VITE_STRAWPOLL_ID_3 || 'NMnQBXAQAg6'
  },

  // Social Media Configuration
  social: {
    instagramHashtag: import.meta.env.VITE_INSTAGRAM_HASHTAG || '#BiggBoss9Telugu',
    twitterHashtag: import.meta.env.VITE_TWITTER_HASHTAG || '#BBTelugu'
  },

  // Contestants Configuration
  contestants: (() => {
    try {
      const contestantData = import.meta.env.VITE_CONTESTANTS;
      if (contestantData) {
        return JSON.parse(contestantData);
      }
      // Default fallback contestants
      return {
        week: 12,
        contestants: [
          {
            id: 1,
            name: "Diya Nikhita",
            phone: "+91 88866 50465",
            initials: "DN",
            color: "linear-gradient(135deg, #FF6B6B 0%, #FF8E72 100%)",
            imageUrl: "https://hfphvsuqrlqeiozyltml.supabase.co/storage/v1/object/public/contestants_avatar/Divya-Nikhita-Bigg-boss-9-telugu-voting.webp"
          },
          {
            id: 2,
            name: "Sanjana Gairani",
            phone: "+91 88866 50460",
            initials: "SG",
            color: "linear-gradient(135deg, #4ECDC4 0%, #44A08D 100%)",
            imageUrl: "https://hfphvsuqrlqeiozyltml.supabase.co/storage/v1/object/public/contestants_avatar/Bigg-Boss-9-Telugu-Voting-Sanjana-Galrani.webp"
          },
          {
            id: 3,
            name: "Demon Pavan",
            phone: "+91 88866 50451",
            initials: "DP",
            color: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            imageUrl: "https://hfphvsuqrlqeiozyltml.supabase.co/storage/v1/object/public/contestants_avatar/Bigg-Boss-9-Telugu-Voting-Demon-Pavan.webp"
          },
          {
            id: 4,
            name: "Bharani",
            phone: "+91 88866 50450",
            initials: "B",
            color: "linear-gradient(135deg, #F093FB 0%, #F5576C 100%)",
            imageUrl: "https://hfphvsuqrlqeiozyltml.supabase.co/storage/v1/object/public/contestants_avatar/Bigg-Boss-9-Telugu-Voting-Bharani.webp"
          },
          {
            id: 5,
            name: "Suman Shetty",
            phone: "+91 888 66 50 463",
            initials: "SS",
            color: "linear-gradient(135deg, #4DB8FF 0%, #0099FF 100%)",
            imageUrl: "https://hfphvsuqrlqeiozyltml.supabase.co/storage/v1/object/public/contestants_avatar/Bigg-Boss-9-Telugu-Voting-Suman-Shetty.webp"
          },
          {
            id: 6,
            name: "Emmanuel",
            phone: "+91 88866 50452",
            initials: "E",
            color: "linear-gradient(135deg, #FFB347 0%, #FFA500 100%)",
            imageUrl: "https://hfphvsuqrlqeiozyltml.supabase.co/storage/v1/object/public/contestants_avatar/Bigg-Boss-9-Telugu-Voting-Emmanuel.webp"
          },
          {
            id: 7,
            name: "Kalyan Padala",
            phone: "+91 88866 50455",
            initials: "KP",
            color: "linear-gradient(135deg, #95E1D3 0%, #38ADA9 100%)",
            imageUrl: "https://hfphvsuqrlqeiozyltml.supabase.co/storage/v1/object/public/contestants_avatar/Bigg-Boss-9-Telugu-Voting-Kalyan-Padala.webp"
          },
          {
            id: 8,
            name: "Thanuja Puttasswamy",
            phone: "+91 888 66 50 464",
            initials: "TP",
            color: "linear-gradient(135deg, #E0C3FC 0%, #8EC5FC 100%)",
            imageUrl: "https://hfphvsuqrlqeiozyltml.supabase.co/storage/v1/object/public/contestants_avatar/Bigg-Boss-9-Telugu-Voting-Thanuja-Puttasswamy.webp"
          }
        ]
      };
    } catch (error) {
      console.error('Error parsing contestants from environment:', error);
      return {
        week: 12,
        contestants: []
      };
    }
  })(),

  // API Configuration
  api: {
    contactTable: 'contact_messages',
    discussionsTable: 'discussions',
    votesTable: 'votes'
  }
};

// Validate configuration on load
const validateConfig = () => {
  const errors = [];
  const warnings = [];

  // Critical validations
  if (!CONFIG.supabase.url) {
    warnings.push('VITE_SUPABASE_URL not configured - Supabase features will not work');
  }
  if (!CONFIG.supabase.key) {
    warnings.push('VITE_SUPABASE_KEY not configured - Supabase features will not work');
  }

  // Poll ID validations
  if (!CONFIG.polls.id1 || CONFIG.polls.id1 === 'NMnQBXAQAg6') {
    warnings.push('VITE_STRAWPOLL_ID_1 using default value - update with your poll ID');
  }
  if (!CONFIG.polls.id2 || CONFIG.polls.id2 === 'NMnQBXAQAg6') {
    warnings.push('VITE_STRAWPOLL_ID_2 using default value - update with your poll ID');
  }
  if (!CONFIG.polls.id3 || CONFIG.polls.id3 === 'NMnQBXAQAg6') {
    warnings.push('VITE_STRAWPOLL_ID_3 using default value - update with your poll ID');
  }

  // Contestants validation
  if (!CONFIG.contestants.contestants || CONFIG.contestants.contestants.length === 0) {
    errors.push('VITE_CONTESTANTS not configured or empty - no nominees will be displayed');
  } else {
    // Validate contestant structure
    const requiredFields = ['id', 'name', 'phone', 'initials', 'color'];
    CONFIG.contestants.contestants.forEach((contestant, index) => {
      requiredFields.forEach(field => {
        if (!contestant[field]) {
          warnings.push(`Contestant ${index + 1} (${contestant.name || 'Unknown'}) missing field: ${field}`);
        }
      });
    });
  }

  // Log results
  if (errors.length > 0) {
    console.error('❌ Configuration Errors:', errors);
  }
  if (warnings.length > 0) {
    console.warn('⚠️ Configuration Warnings:', warnings);
  }
  if (errors.length === 0 && warnings.length === 0) {
    console.log('✅ Configuration validated successfully');
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings
  };
};

// Export configuration and validator
export { CONFIG, validateConfig };