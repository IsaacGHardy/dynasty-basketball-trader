export interface GuideSection {
  id: string;
  title: string;
  content: GuideItem[];
}

export interface GuideItem {
  type: 'text' | 'list' | 'example' | 'note';
  content: string;
  items?: string[];
  highlight?: boolean;
}

export const GUIDE_CONTENT: GuideSection[] = [
  {
    id: 'how-it-works',
    title: 'The Framework Behind the Numbers',
    content: [
      {
        type: 'text',
        content: 'Dynasty basketball is complex. We\'ve built a sophisticated system that cuts through the noise and gives you the real story on player values based on your team\'s specific situation.'
      },
      {
        type: 'list',
        content: 'Our Core Methodology:',
        items: [
          'Player valuations use recent performance data to capture emerging trends',
          'Sample sizes are optimized to filter out noise while staying current',
          'Trades are evaluated using statistical analysis to provide accurate feedback',
          'Players are valued based on your team\'s context and needs'
        ]
      }
    ]
  },
  {
    id: 'contention-tiers',
    title: 'Five Team Archetypes',
    content: [
      {
        type: 'text',
        content: 'Your team\'s strategy will dictate how you approach trades, player valuations, and overall roster construction. The 5 team archetypes and valuation systems help you tailor to your team\'s needs.'
      },
      {
        type: 'list',
        content: 'Contend Mode:',
        items: [
          'Win-now mode with a legitimate championship window',
          'Age becomes irrelevant -- production is everything',
          'Player value entirely based on fantasy point production'
        ]
      },
      {
        type: 'list',
        content: 'Compete Mode:',
        items: [
          'Championship hunting with future considerations',
          'Prefers immediate impact players but not entirely at the cost of youth',
          'Player value slightly increased for younger players and decreased for older players'
        ]
      },
      {
        type: 'list',
        content: 'Neutral Mode (The Default):',
        items: [
          'Asset accumulation without timeline pressure',
          'Focused on bringing in value -- a good middle metric for overall evaluation',
          'Moderate value increase for younger players and decrease for older players'
        ]
      },
      {
        type: 'list',
        content: 'Reload Mode:',
        items: [
          'Building around an identified future core',
          'Prioritizes younger players with known impact',
          'Large value increase for youth and decrease for veterans'
        ]
      },
      {
        type: 'list',
        content: 'Rebuild Mode:',
        items: [
          'Fully committed to tanking',
          'Long-term potential drives every decision',
          'Immense value increase for young players and decrease for older players'
        ]
      }
    ]
  },
  {
    id: 'trade-evaluation',
    title: 'The Mathematics of Trade Evaluation',
    content: [
      {
        type: 'text',
        content: 'We\'ve implemented two fundamental principles to ensure fair trade evaluations and prevent common dynasty mistakes.'
      },
      {
        type: 'list',
        content: '1. Proportional Asset Weighting:',
        items: [
          'Asset values are adjusted proportional to the best player in the trade',
          'Prevents quantity-for-quality trades ',
          'Larger talent gaps result in steeper discounts on lesser assets',
        ]
      },
      {
        type: 'example',
        content: 'You cannot trade 12 3rd round picks for Wemby'
      },
      {
        type: 'list',
        content: '2. Diminishing Returns by Asset Tier:',
        items: [
          'Assets are categorized into tiers',
          'Lower tiered assets contribute decreasing value amounts to the trade',
          'Encourages quality over quantity in trade construction'
        ]
      },
      {
        type: 'example',
        content: 'You cannot trade 6 2nd round picks for Wemby'
      }
    ]
  },
  {
    id: 'scoring-systems',
    title: 'Platform-Specific Calibration',
    content: [
      {
        type: 'text',
        content: 'Scoring systems aren\'t just different - they fundamentally alter player hierarchies and dynasty values. We\'ve calibrated our algorithms for two dominant platforms in dynasty basketball.'
      },
      {
        type: 'list',
        content: 'Current Platform Support:',
        items: [
          'ESPN Standard',
          'Sleeper Standard'
        ]
      },
      {
        type: 'text',
        content: 'Future Development: Additional scoring systems and custom input functionality. Because every league commissioner thinks their scoring system is revolutionary (and occasionally, they\'re right).'
      }
    ]
  },
  {
    id: 'limitations',
    title: 'Current System Limitations',
    content: [
      {
        type: 'text',
        content: 'Here are the factors our system doesn\'t currently account for - consider these the manual adjustments sophisticated managers make.'
      },
      {
        type: 'list',
        content: 'Injury History and Durability:',
        items: [
          'Injury patterns and availability concerns aren\'t factored into valuations',
          'Always cross-reference with injury data before major trades',
          'Future development will incorporate durability metrics'
        ]
      },
      {
        type: 'list',
        content: 'Situational Context:',
        items: [
          'Role changes from trades or coaching adjustments take time to reflect',
          'Market shifts require manual evaluation and context',
          'The human element still matters in dynasty decisions'
        ]
      }
    ]
  },
  {
    id: 'final-note',
    title: 'The Bottom Line',
    content: [
      {
        type: 'note',
        content: 'YOU are the general manager. This tool provides analytical foundation, but championships are built on the decisions YOU make with this information.',
        highlight: true
      },
      {
        type: 'text',
        content: 'Use this system as your baseline, not your final authority. The best dynasty managers combine data-driven insights with strategic vision and contextual awareness.'
      }
    ]
  }
];
