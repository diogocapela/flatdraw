const sizePresets = {
  instagram: {
    label: 'Instagram',
    types: {
      'post-square': {
        label: 'Post (Square)',
        width: 1080,
        height: 1080,
      },
      'post-portrait': {
        label: 'Post (Portrait)',
        width: 1080,
        height: 1350,
      },
      story: {
        label: 'Story',
        width: 1080,
        height: 1920,
      },
      reel: {
        label: 'Reel',
        width: 1080,
        height: 1920,
      },
      'profile-picture': {
        label: 'Profile Picture',
        width: 1024,
        height: 1024,
      },
    },
  },
  twitter: {
    label: 'Twitter',
    types: {
      post: {
        label: 'Post',
        width: 1600,
        height: 900,
      },
      header: {
        label: 'Header',
        width: 1500,
        height: 500,
      },
      'profile-picture': {
        label: 'Profile Picture',
        width: 1024,
        height: 1024,
      },
      ad: {
        label: 'Ad',
        width: 1600,
        height: 900,
      },
    },
  },
  linkedin: {
    label: 'LinkedIn',
    types: {
      post: {
        label: 'Post',
        width: 1200,
        height: 1200,
      },
      'profile-picture': {
        label: 'Profile Picture',
        width: 800,
        height: 800,
      },
      'profile-cover': {
        label: 'Profile Cover',
        width: 1584,
        height: 396,
      },
      'company-profile': {
        label: 'Company Profile',
        width: 300,
        height: 300,
      },
      'company-cover': {
        label: 'Company Cover',
        width: 1400,
        height: 425,
      },
      'single-image-ad': {
        label: 'Single Image Ad',
        width: 1200,
        height: 627,
      },
    },
  },
  facebook: {
    label: 'Facebook',
    types: {
      'profile-picture': {
        label: 'Profile Picture',
        width: 2048,
        height: 2048,
      },
      ad: {
        label: 'Ad',
        width: 1200,
        height: 628,
      },
      cover: {
        label: 'Cover',
        width: 1640,
        height: 924,
      },
      'event-cover': {
        label: 'Event Cover',
        width: 1920,
        height: 1080,
      },
      'post-landscape': {
        label: 'Post (Landscape)',
        width: 1200,
        height: 630,
      },
      'post-square': {
        label: 'Post (Square)',
        width: 1080,
        height: 1080,
      },
      'fundraiser-cover': {
        label: 'Fundraiser Cover',
        width: 940,
        height: 348,
      },
    },
  },
  snapchat: {
    label: 'Snapchat',
    types: {
      'collection-ad-thumbnail': {
        label: 'Collection Ad Thumbnail',
        width: 160,
        height: 160,
      },
      'collection-ad-video': {
        label: 'Collection Ad Video',
        width: 1080,
        height: 1920,
      },
      'commercial-ad': {
        label: 'Commercial Ad',
        width: 1080,
        height: 1920,
      },
      'snap-ad-static': {
        label: 'Snap Ad Static',
        width: 1080,
        height: 1920,
      },
      'snap-ad-video': {
        label: 'Snap Ad Video',
        width: 1080,
        height: 1920,
      },
    },
  },
  pinterest: {
    label: 'Pinterest',
    types: {
      'pin-small': {
        label: 'Pin (Small)',
        width: 1000,
        height: 1500,
      },
      'pin-large': {
        label: 'Pin (Large)',
        width: 1080,
        height: 1920,
      },
      'idea-pin': {
        label: 'Idea Pin',
        width: 1080,
        height: 1920,
      },
      'carousel-ad': {
        label: 'Carousel Ad',
        width: 1000,
        height: 1500,
      },
      'static-ad': {
        label: 'Static Ad',
        width: 1000,
        height: 1500,
      },
    },
  },
  tiktok: {
    label: 'TikTok',
    types: {
      'profile-picture': {
        label: 'Profile Picture',
        width: 400,
        height: 400,
      },
      story: {
        label: 'Story',
        width: 1080,
        height: 1920,
      },
      video: {
        label: 'Video',
        width: 1080,
        height: 1920,
      },
    },
  },
  youtube: {
    label: 'YouTube',
    types: {
      'channel-banner': {
        label: 'Channel Banner',
        width: 2560,
        height: 1440,
      },
      'channel-logo': {
        label: 'Channel Logo',
        width: 800,
        height: 800,
      },
      'display-ad': {
        label: 'Display Ad',
        width: 600,
        height: 120,
      },
      'livestream-video': {
        label: 'Livestream Video',
        width: 1920,
        height: 1080,
      },
      'profile-picture': {
        label: 'Profile Picture',
        width: 800,
        height: 800,
      },
      shorts: {
        label: 'Shorts',
        width: 1080,
        height: 1920,
      },
      thumbnail: {
        label: 'Thumbnail',
        width: 1280,
        height: 720,
      },
      'video-chapter': {
        label: 'Video Chapter',
        width: 1920,
        height: 1080,
      },
    },
  },
  soundcloud: {
    label: 'SoundCloud',
    types: {
      'profile-picture': {
        label: 'Profile Picture',
        width: 800,
        height: 800,
      },
      banner: {
        label: 'Banner',
        width: 2480,
        height: 520,
      },
    },
  },
  whatsapp: {
    label: 'WhatsApp',
    types: {
      'profile-picture': {
        label: 'Profile Picture',
        width: 500,
        height: 500,
      },
      status: {
        label: 'Status',
        width: 1080,
        height: 1920,
      },
    },
  },
  reddit: {
    label: 'Reddit',
    types: {
      'profile-picture': {
        label: 'Profile Picture',
        width: 600,
        height: 600,
      },
      banner: {
        label: 'Banner',
        width: 1920,
        height: 384,
      },
      post: {
        label: 'Post',
        width: 1920,
        height: 1080,
      },
      'promoted-post': {
        label: 'Promoted Post',
        width: 1000,
        height: 628,
      },
    },
  },
} satisfies Record<
  string,
  {
    label: string;
    types: Record<
      string,
      {
        label: string;
        width: number;
        height: number;
      }
    >;
  }
>;

export default sizePresets;
