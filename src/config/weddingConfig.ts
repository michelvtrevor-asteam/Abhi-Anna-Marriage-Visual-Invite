export interface TimelineEventItem {
  id: string;
  time: string;
  title: string;
  venue: string;
  description: string;
  iconType: 'chapel' | 'rings' | 'blessing' | 'celebration';
}

export interface GalleryArtworkItem {
  id: string;
  title: string;
  caption: string;
  aspect: 'landscape' | 'portrait' | 'square';
  artworkType: 'blossoms' | 'cross' | 'rings' | 'bouquet' | 'sprig' | 'gypsophila';
  /**
   * Replace with an actual photograph URL or local asset path (e.g. '/photos/couple-1.jpg')
   * when couple photographs become available.
   */
  imageUrl?: string;
}

export const weddingConfig = {
  groom: 'Abhishek',
  bride: 'Keerthana',
  monogram: 'A&K',
  coupleFullTitle: 'Abhishek & Keerthana',

  date: {
    fullDisplay: 'Saturday, 28 November 2026',
    dayOfWeekUpper: 'SATURDAY',
    dayOfWeek: 'Saturday',
    dateUpper: '28 NOVEMBER 2026',
    dateFormatted: '28 November 2026',
    dayNumber: '28',
    monthName: 'November',
    yearNumber: '2026',
    timeDisplay: '10:30 AM',
    timeWithZone: '10:30 AM IST',
    calendarTimeRange: '10:30 AM – 1:00 PM (IST)',
    isoStartIST: '2026-11-28T10:30:00+05:30',
    isoEndIST: '2026-11-28T13:00:00+05:30',
    icsUtcStart: '20261128T050000Z',
    icsUtcEnd: '20261128T073000Z',
    icsLocalStart: '20261128T103000',
    icsLocalEnd: '20261128T130000',
    timeZone: 'Asia/Kolkata',
  },

  venue: {
    name: 'SRK Function Hall',
    fullName: '(S.R.K) Sri Radha Krishna Grand Palace & Function Hall A/C',
    addressLine: 'Ashapur Road',
    cityLine: 'Raichur, Karnataka, India',
    shortLocation: 'SRK Function Hall, Ashapur Road, Raichur',
    fullAddress: 'SRK Function Hall, Ashapur Road, Raichur, Karnataka, India',
    mapsUrl: 'https://share.google/xlaheSHM33tKomDm3',
  },

  solemnization: {
    pastorTitle: 'Bro. P. Sunil Kumar',
    designation: 'Chief Preacher, Warangal',
    fullMention: 'Bro. P. Sunil Kumar, Chief Preacher Warangal',
  },

  family: {
    invitationTitle: "Pedda Rayudu Family's Wedding Invitation",
    grandparents: [
      'Mrs. Anandamma & Late Mr. Abraham',
      'Mrs. Siromani & Mr. Sundar Raj',
    ],
    groomParents: 'Mrs. Sarojamma & Mr. Chinni Kumar (Matamari)',
    groomCamp: 'Gillesuguru Camp, Matamari Tq. & Dist. Raichur',
    brideParents: 'Mrs. Radhika & Mr. Kumar',
    brideHometown: 'R/o. Komalla, Dist. Jangaon (Telangana)',
    contactParents: 'Mrs. Sarojamma & Mr. Chinni Kumar Gillesuguru Camp',
    contactFamily: 'Mrs. Shantamma & Mr. Prabhu Matamari',
    residence: 'Matamari Tq. & Dist. Raichur',
    cellPhone: '73532 85327',
    additionalPhones: ['80728 96789', '73532 85327', '98807 13262'],
    kambayyaFamilyNote: "With best compliments from: Kambayya's Family, all Relatives and Friends.",
  },

  contact: {
    phoneDisplay: '+91 80728 96789',
    phoneSecondary: '+91 73532 85327',
    phoneInternationalDigits: '918072896789',
  },

  envelopeCopy: {
    salutation: 'TO OUR DEAR FAMILY & FRIENDS',
    monogram: 'A&K',
    subtitlePrefix: 'An Invitation to',
    subtitleScript: 'Celebrate Love',
    ctaLabel: 'OPEN YOUR INVITATION',
    emergingCaption: 'A new chapter begins...',
  },

  invitationCopy: {
    familyBanner: "Pedda Rayudu Family's Wedding Invitation",
    graceHeader: 'By the grace and blessings of Jesus Christ',
    blessingHeader: "WITH GOD'S BLESSINGS",
    familiesLine: 'Together with our families,',
    celebrateSubline: 'to celebrate the holy matrimony of',
    promiseQuote: '"Pray for us: for we trust we have a good conscience, in all things willing to live honestly."',
    honourMessage:
      '"We would be honoured by your presence and prayers as we begin our new journey together under God\'s grace."',
    grandparentsBlessing:
      'and with the blessings of Mrs. Anandamma & Late Mr. Abraham and Mrs. Siromani & Mr. Sundar Raj',
    inviteHeader:
      'Cordially invite you to grace esteemed presence and prayers with family on the auspicious occasion of the holy matrimony of our elder son',
    groomDetails: 'Abhishek (S/o. Mrs. Sarojamma & Mr. Chinni Kumar (Matamari), Gillesuguru Camp)',
    brideDetails: 'K. Keerthana (D/o. Mrs. Radhika & Mr. Kumar, R/o. Komalla, Dist. Jangaon, Telangana)',
    pastorNote: 'To be Solemnised by Bro. P. Sunil Kumar (Chief Preacher Warangal)',
  },

  scriptureSection: {
    sectionSubtitle: 'His Word, Our Foundation',
    verses: [
      {
        text: '"Pray for us: for we trust we have a good conscience, in all things willing to live honestly."',
        reference: '— Hebrews 13:18',
      },
      {
        text: '"Above all, love each other deeply."',
        reference: '— 1 Peter 4:8',
      },
      {
        text: '"Therefore what God has joined together, let no one separate."',
        reference: '— Mark 10:9',
      },
    ],
    closingBlessing:
      'May God bless this new beginning with faith, joy, patience, peace and everlasting love.',
  },

  timeline: {
    heading: 'WEDDING TIMELINE',
    subheading: 'A day of holy matrimony and thanksgiving',
    events: [
      {
        id: 'guest-arrival',
        time: '10:00 AM',
        title: 'Guest Arrival & Prayer',
        venue: 'SRK Function Hall, Ashapur Road, Raichur',
        description:
          "Welcoming loved ones as we gather together in worship and thanksgiving.",
        iconType: 'blessing',
      },
      {
        id: 'wedding-ceremony',
        time: '10:30 AM',
        title: 'Holy Matrimony Service',
        venue: 'SRK Function Hall, Ashapur Road, Raichur',
        description:
          "Solemnised by Bro. P. Sunil Kumar (Chief Preacher, Warangal).",
        iconType: 'chapel',
      },
      {
        id: 'blessings-photos',
        time: '12:00 PM',
        title: 'Pastoral Blessings & Photographs',
        venue: 'SRK Function Hall, Ashapur Road, Raichur',
        description:
          "Congratulating the newly wedded couple and capturing cherished memories.",
        iconType: 'rings',
      },
      {
        id: 'wedding-feast',
        time: '1:00 PM',
        title: 'Wedding Feast & Fellowship',
        venue: 'SRK Function Hall Dining Pavilion',
        description:
          "Sharing a joyful fellowship meal with the family, relatives, and friends.",
        iconType: 'celebration',
      },
    ] as TimelineEventItem[],
  },

  gallery: {
    heading: 'OUR GALLERY',
    subheading: 'Moments of love, faith and forever',
    items: [
      {
        id: 'gallery-blossoms',
        title: 'Grace in Bloom',
        caption: 'Delicate ivory blossoms bathed in morning light — a reflection of pure beginnings.',
        aspect: 'landscape',
        artworkType: 'blossoms',
      },
      {
        id: 'gallery-cross',
        title: 'Guided by Faith',
        caption: '"Above all, love each other deeply." — 1 Peter 4:8',
        aspect: 'landscape',
        artworkType: 'cross',
      },
      {
        id: 'gallery-rings',
        title: 'Two Hearts, One Promise',
        caption: 'Sacred vows of faithfulness, patience, and everlasting covenant love.',
        aspect: 'square',
        artworkType: 'rings',
      },
      {
        id: 'gallery-bouquet',
        title: 'Bridal White Roses',
        caption: 'Hand-tied white roses and baby’s breath prepared for Saturday, 28 November 2026.',
        aspect: 'portrait',
        artworkType: 'bouquet',
      },
      {
        id: 'gallery-sprig',
        title: 'Handcrafted Stationery',
        caption: 'Ivory botanical details and timeless heirloom craftsmanship.',
        aspect: 'portrait',
        artworkType: 'sprig',
      },
      {
        id: 'gallery-gypsophila',
        title: 'A Lifetime Under God’s Grace',
        caption: 'Looking ahead to a joyful celebration with family and friends in Raichur.',
        aspect: 'landscape',
        artworkType: 'gypsophila',
      },
    ] as GalleryArtworkItem[],
  },

  music: {
    trackTitle: 'Wedding Vibes',
    subtitle: 'Play our special song',
    /**
     * Optional path to a custom local audio file (e.g. '/audio/wedding-song.mp3').
     * When empty or unavailable, the player uses its built-in polyphonic chamber strings & harp prelude.
     */
    audioSrc: '',
  },

  sharing: {
    heading: 'SHARE OUR INVITATION',
    prefilledMessage:
      "By the grace and blessings of Jesus Christ, Abhishek & Keerthana joyfully invite you to celebrate their holy matrimony on Saturday, 28 November 2026 at 10:30 AM at SRK Function Hall, Ashapur Road, Raichur. Solemnised by Bro. P. Sunil Kumar (Chief Preacher Warangal). We cordially invite you with family. Please join us in prayer and celebration.",
    buttonLabel: 'SHARE ON WHATSAPP',
  },

  rsvp: {
    heading: 'WE WOULD LOVE TO CELEBRATE WITH YOU',
    supportingText: 'Your presence and prayers would mean so much to us.',
    buttonLabel: 'RESPOND ON WHATSAPP',
    prefilledMessage:
      'Hello! I received the wedding invitation for Abhishek & Keerthana on 28 November 2026 at SRK Function Hall, Raichur. I would like to respond to the invitation.',
  },

  calendar: {
    heading: 'ADD TO CALENDAR',
    subheading: 'Save the date to your calendar',
    eventTitle: 'Holy Matrimony of Abhishek & Keerthana',
    buttonLabel: 'ADD TO CALENDAR',
    description:
      "By the grace and blessings of Jesus Christ, celebrate the holy matrimony of Abhishek & Keerthana on Saturday, 28 November 2026 at 10:30 AM IST at SRK Function Hall, Ashapur Road, Raichur. Solemnised by Bro. P. Sunil Kumar. Directions: https://share.google/xlaheSHM33tKomDm3",
  },

  closing: {
    header: 'WITH LOVE AND PRAYERS',
    coupleNames: 'ABHISHEK & KEERTHANA',
    monogram: 'A&K',
    message:
      'Thank you for being part of our joy. Your presence, love and prayers are a precious blessing to us.',
    epilogueLines: ['Two souls', 'One journey', "God's grace"],
  },
} as const;
