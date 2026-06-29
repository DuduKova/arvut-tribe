export type SupportedLocale = "he" | "en";

export type HomepageIcon =
  | "safe"
  | "longTerm"
  | "community"
  | "legal"
  | "medical"
  | "ethics"
  | "applicant"
  | "facilitator";

export type Stat = {
  value: string;
  label: string;
  highlight?: boolean;
};

export type PhaseItem = {
  title: string;
  description: string;
  plant?: boolean;
};

export type Phase = {
  number: string;
  badge: string;
  title: string;
  intro?: string;
  image?: string;
  imageAlt?: string;
  highlight?: boolean;
  items: PhaseItem[];
};

type SectionHeadingContent = {
  label: string;
  title: string;
  intro?: string;
};

type ContentCard = {
  title: string;
  description: string;
  icon: HomepageIcon;
};

type HomepageContent = {
  hero: {
    imageAlt: string;
    eyebrow: string;
    title: string;
    subtitleLines: string[];
    tagline: string;
    applyCta: string;
    programCta: string;
    scroll: string;
  };
  announcement: {
    badge: string;
    departure: string;
    availability: string;
    cta: string;
  };
  crisis: SectionHeadingContent & {
    stats: Stat[];
    imageAlt: string;
    imageMobile?: string;
    imageMobileAlt?: string;
    quote: string;
    attribution: string;
    source: string;
    mission: string;
  };
  gap: SectionHeadingContent;
  solution: SectionHeadingContent & {
    imageAlt: string;
    pillars: ContentCard[];
    peru: {
      imageAlt: string;
      label: string;
      title: string;
      description: string;
    };
  };
  program: SectionHeadingContent & {
    phases: Phase[];
  };
  pricing: SectionHeadingContent & {
    amount: string;
    currency: string;
    amountLabel: string;
    included: string[];
  };
  foundation: SectionHeadingContent & {
    cards: ContentCard[];
    research: {
      label: string;
      title: string;
      description: string;
      items: Array<{
        title: string;
        text: string;
      }>;
    };
  };
  apply: {
    imageAlt: string;
    label: string;
    title: string;
    description: string;
    applicant: ContentCard;
    facilitator: ContentCard;
  };
};

export const homepageContent: Record<SupportedLocale, HomepageContent> = {
  he: {
    hero: {
      imageAlt: "לוחם עומד ביער האמזונס",
      eyebrow: "קליני · חדשני · קהילתי",
      title: "שומרי השבט",
      subtitleLines: ["ריפוי פוסט-טראומה לחיילים וחיילות", "נפגעי הלחימה"],
      tagline:
        "חכמת האמזונס העתיקה · פסיכולוגיה קלינית מערבית · קהילה לכל החיים",
      applyCta: "להגשת מועמדות",
      programCta: "למידע על התוכנית",
      scroll: "גלול למטה",
    },
    announcement: {
      badge: "מיונים פתוחים עכשיו",
      departure: "המסע הקרוב יוצא לפרו: 15 לנובמבר 2026",
      availability: "מספר המקומות מוגבל",
      cta: "הגישו מועמדות",
    },
    crisis: {
      label: "המשבר הלאומי",
      title: "לוחמינו נלחמים במלחמה בלתי נראית בבית",
      intro:
        'המלחמה שפרצה ב-7 באוקטובר 2023 חוללה בישראל "צונאמי של פצועי נפש" — כך מגדירים זאת המומחים הבכירים ביותר בתחום הטראומה בישראל.',
      stats: [
        {
          value: "87,000+",
          label:
            "פצועי נפש שטופלו על ידי משרד הביטחון, עלייה חדה מ-62,000 לפני שנה",
          highlight: true,
        },
        {
          value: "58%",
          label: "מהפצועים החדשים מאז 7 באוקטובר סובלים מפגיעה נפשית",
        },
        {
          value: "100,000",
          label: "פצועים צפויים עד 2028. לפחות מחציתם עם PTSD",
        },
        {
          value: "×10",
          label:
            "גידול במוכרים בביטוח לאומי בשל פציעות נפש: מ-6,400 לפני המלחמה לכ-69,000 כיום",
          highlight: true,
        },
      ],
      imageAlt: "חיילי צה״ל בפעולה",
      quote:
        "המספרים לא משאירים צל של ספק. ישראל במשבר לאומי. הנזקים שאנחנו רואים היום הם רק קצה הקרחון של מה שעוד יגיע.",
      attribution: "— יו״ר המועצה הלאומית לפוסט-טראומה",
      source: "מתוך כתבת הארץ, יוני 2026",
      mission:
        "המשימה: להרחיב את אפשרויות התמיכה והריפוי עבור אחינו ואחיותינו המתמודדים עם טראומה.",
    },
    gap: {
      label: "הפער",
      title: "לא כל טיפול מתאים לכל אדם",
      intro:
        "הטיפולים הקיימים עוזרים באספקטים מסויימים אבל לעתים אינם מקיפים ולא מרפאים מהשורש. אנו מציעים מעטפת נוספת המחברת בין רפואה עתיקה, טיפול קליני, גוף קהילה והטמעה בחיי היום יום.",
    },
    solution: {
      label: "הפתרון שלנו",
      title: "שילוב מסורת אמזונית עם ליווי קליני",
      intro:
        "הריטריט בפרו הוא חלק ממסגרת טיפולית רחבה יותר, הכוללת מיון, הכנה, ליווי מקצועי ותהליך אינטגרציה ממושך לאחר החזרה.",
      imageAlt: "שביל המרכז ביער האמזונס",
      pillars: [
        {
          title: "מיכל בטוח",
          description:
            "בהובלת פסיכולוגים קליניים ומרפאים מנוסים, בתוך מסגרת רציפה ותומכת.",
          icon: "safe",
        },
        {
          title: "מיקוד ארוך-טווח",
          description:
            "רצף טיפולי שמחבר הכנה, עבודה עמוקה בפרו והטמעה בחיי היום-יום.",
          icon: "longTerm",
        },
        {
          title: "קהילה ושבט",
          description:
            'יצירת "שבט" תמיכה שנמשך לכל החיים. אתם לא עושים את הדרך הזו לבד.',
          icon: "community",
        },
      ],
      peru: {
        imageAlt: "נוף בפרו",
        label: "מסע ללב האמזונס",
        title: "פרו היא לא רק יעד. היא המרחב שמאפשר לעבודה להעמיק.",
        description:
          "הניתוק מהשגרה, מהעומס ומהרעש מאפשר למערכת העצבים להירגע, לגוף להשתחרר, ולתהליך הקליני לקבל עומק שהיום-יום פשוט לא מאפשר.",
      },
    },
    program: {
      label: "התוכנית",
      title: "המסע הקליני: שלושה שלבים",
      intro:
        "המסע שלנו מתחיל כחודשיים לפני היציאה לפרו, ונמשך חצי שנה אחריו. זוהי התחייבות ארוכת-טווח לריפוי עמוק.",
      phases: [
        {
          number: "01",
          badge: "ישראל · 6 שבועות",
          title: "הכנה",
          items: [
            {
              title: "ראיונות אישיים",
              description: "הערכה קלינית עמוקה לבדיקת מועמדות ותיאום ציפיות.",
            },
            {
              title: "פגישות קבוצתיות",
              description: 'בניית אמון ואינטימיות "שבטית" לפני היציאה.',
            },
            {
              title: "ניקוי קמבו",
              description:
                "טקס אמזוני מסורתי לא-פסיכואקטיבי, המוצע רק לאחר בחינת התאמה ובהתאם לפרוטוקולי הבטיחות.",
              plant: true,
            },
            {
              title: "עבודת נשימה (ריברסינג)",
              description: "לוויסות סומטי וגישה לרגשות מודחקים.",
            },
            {
              title: "שיחות קבוצתיות ואישיות",
              description:
                "בהנחיית פסיכולוגים קליניים ליצירת מיכל בטוח ומגע ראשוני בתכנים נפשיים.",
            },
          ],
        },
        {
          number: "02",
          badge: "פרו · 14 יום",
          title: "ריטריט רפואה אמזונית בפרו",
          intro:
            "במשך שבועיים נצא מהרעש של העולם המודרני ונכנס לתוך יער האמזונס הפרואני. סביבה מאובטחת ומבודדת, עם תמיכה רציפה של הצוות.",
          image: "/tribe-guardians/img_maloka.jpg",
          imageAlt: "מרחב הריטריט ביער האמזונס בפרו",
          highlight: true,
          items: [
            {
              title: "אייווסקה וצמחי רפואה אמזוניים",
              description:
                "בהנחיית אשת רפואה פרואנית מנוסה, ובתמיכה של צוות מנטורים המורכב מחיילים לשבר שעברו בעצמם דרך ריפוי דומה, ואנשי טיפול קליניים.",
              plant: true,
            },
            {
              title: "אינטגרציה יומית",
              description:
                "פגישות קבוצתיות ואישיות עם מטפלים קליניים לעיבוד התכנים העולים בתהליך.",
            },
            {
              title: "פעילויות הוליסטיות",
              description: "תנועה, בישול משותף, יצירה משותפת.",
            },
            {
              title: "טיפולי גוף אישיים",
              description: "תמיכה בשחרור פיזי ורגשי לאורך השהייה.",
            },
          ],
        },
        {
          number: "03",
          badge: "ישראל · 6 חודשים",
          title: "אינטגרציה וחזרה לחיים",
          intro:
            "העבודה ממשיכה בארץ, כדי לעבד את התובנות ולהטמיע אותן בחיי היום-יום.",
          items: [
            {
              title: "אינטגרציה אישית",
              description:
                "פגישות שבועיות אישיות לעיבוד וליווי תהליך האינטגרציה.",
            },
            {
              title: "מעגלי אינטגרציה קבוצתיים",
              description:
                "6 מפגשי אינטגרציה קבוצתיים עם חברי השבט לאורך תקופת האינטגרציה.",
            },
            {
              title: "מפגשי בוגרים קבוצתיים",
              description:
                "מפגשים עם בוגרי ריטריטים קודמים לשמירה על קשר, שיתוף וחיזוק הדדי לאורך זמן.",
            },
          ],
        },
      ],
    },
    pricing: {
      label: "עלות ומה כלול",
      title: "מסגרת אחת, מחיר שקוף",
      intro:
        "תשלום אחד מרכז את כל שלבי המסע תחת מסגרת ברורה, מההכנה בישראל ועד האינטגרציה לאחר החזרה.",
      amount: "35,800",
      currency: "₪",
      amountLabel: "לכל שלבי המסע",
      included: [
        "טיסות הלוך-חזור",
        "כל פגישות ההכנה",
        "ריטריט הכנה בישראל",
        "14 ימי ריטריט בפרו",
        "6 חודשי אינטגרציה",
      ],
    },
    foundation: {
      label: "הבסיס שלנו",
      title: "אפס פשרות",
      cards: [
        {
          title: "מסגרת משפטית",
          description:
            "הפעילות מתקיימת בפרו ובהתאם למסגרת המשפטית המקומית. הנהלים, האחריות והכיסוי הביטוחי מוצגים למועמדים בתהליך המיון.",
          icon: "legal",
        },
        {
          title: "בטיחות רפואית",
          description:
            "ספר פרוטוקולים מקיף מנחה את הצוות בכל שלב, לצד פסיכולוגים ומנטורים שעברו תהליך ריפוי דומה ושירתו ביחידות קרביות.",
          icon: "medical",
        },
        {
          title: "קוד אתיקה",
          description:
            "אנחנו פועלים לפי קוד התנהגות מקצועי שנועד לשמור על גבולות ברורים ולהגן על המשתתפים.",
          icon: "ethics",
        },
      ],
      research: {
        label: "מחקר ולמידה",
        title: "אנחנו לא רק מטפלים. אנחנו לומדים.",
        description:
          "אנחנו מבצעים מחקר פנימי, ובהמשך שואפים לשיתופי פעולה עם חוקרים אקדמיים, כדי לבחון את המודל באופן שיטתי ולשפר אותו לאורך זמן.",
        items: [
          {
            title: "כלים",
            text: "עיצוב רב-מודאלי: פסיכולוגי וחברתי. כלים קליניים",
          },
          {
            title: "מטרה",
            text: "להעמיק את ההבנה של מה שעובד, ולאפשר לכמה שיותר מטופלים לקבל מענה שמשנה חיים",
          },
        ],
      },
    },
    apply: {
      imageAlt: "יער האמזונס",
      label: "הגשת מועמדות",
      title: "מוכן לצעד הראשון?",
      description:
        "בחרו את הטופס המתאים. המענה אישי וחסוי ואינו מחייב; לאחר השליחה נחזור אליכם להמשך תהליך ההיכרות ובחינת ההתאמה.",
      applicant: {
        title: "שאלון למועמד",
        description: "לחיילים ולוחמים המעוניינים להשתתף בתוכנית",
        icon: "applicant",
      },
      facilitator: {
        title: "שאלון למטפל",
        description: "לאנשי מקצוע בבריאות הנפש המעוניינים להצטרף לצוות",
        icon: "facilitator",
      },
    },
  },
  en: {
    hero: {
      imageAlt: "Soldier standing in the Amazon rainforest",
      eyebrow: "Clinical · Innovative · Community-Based",
      title: "Tribe Guardians",
      subtitleLines: [
        "Post-trauma healing for soldiers and service members",
        "affected by combat",
      ],
      tagline:
        "Ancient Amazonian wisdom · Western clinical psychology · A community for life",
      applyCta: "Apply",
      programCta: "Learn About the Program",
      scroll: "Scroll down",
    },
    announcement: {
      badge: "Applications Now Open",
      departure: "The next journey departs for Peru: November 15, 2026",
      availability: "Space is limited",
      cta: "Apply Now",
    },
    crisis: {
      label: "The National Crisis",
      title: "Our Fighters Are Battling an Invisible War at Home",
      intro:
        "The war that began on October 7, 2023 created a “tsunami of mental-health casualties” in Israel—as the country’s leading trauma experts describe it.",
      stats: [
        {
          value: "87,000+",
          label:
            "Mental-health casualties treated by the Ministry of Defense, a sharp rise from 62,000 one year ago",
          highlight: true,
        },
        {
          value: "58%",
          label:
            "Of those newly wounded since October 7 are experiencing mental-health injuries",
        },
        {
          value: "100,000",
          label:
            "Wounded people projected by 2028. At least half are expected to have PTSD",
        },
        {
          value: "×10",
          label:
            "Increase in people recognized by the National Insurance Institute for mental-health injuries: from 6,400 before the war to about 69,000 today",
          highlight: true,
        },
      ],
      imageAlt: "Israeli soldiers in action",
      quote:
        "The numbers leave no room for doubt. Israel is facing a national crisis. The damage we see today is only the tip of the iceberg of what is still to come.",
      attribution: "— Chair of the National Council for Post-Trauma",
      source: "From a Haaretz article, June 2026",
      mission:
        "Our mission: to expand the possibilities for support and healing available to our brothers and sisters living with trauma.",
    },
    gap: {
      label: "The Gap",
      title: "No Single Treatment Is Right for Everyone",
      intro:
        "Existing treatments help with certain aspects, but they are sometimes not comprehensive and do not heal at the root. We offer an additional framework that connects ancient medicine, clinical care, the body, community, and integration into everyday life.",
    },
    solution: {
      label: "Our Solution",
      title: "Amazonian Tradition with Clinical Support",
      intro:
        "The retreat in Peru is one part of a broader therapeutic framework that includes screening, preparation, professional support, and an extended integration process after returning home.",
      imageAlt: "Path through the Amazon rainforest retreat center",
      pillars: [
        {
          title: "A Safe Container",
          description:
            "Led by clinical psychologists and experienced healers within a continuous, supportive framework.",
          icon: "safe",
        },
        {
          title: "A Long-Term Focus",
          description:
            "A continuum of care connecting preparation, deep work in Peru, and integration into daily life.",
          icon: "longTerm",
        },
        {
          title: "Community and Tribe",
          description:
            "A lifelong “tribe” of support. You do not have to walk this path alone.",
          icon: "community",
        },
      ],
      peru: {
        imageAlt: "Landscape in Peru",
        label: "A Journey into the Heart of the Amazon",
        title:
          "Peru is more than a destination. It is the setting that allows the work to deepen.",
        description:
          "Stepping away from routine, pressure, and noise allows the nervous system to settle, the body to release, and the clinical process to reach a depth that daily life simply does not allow.",
      },
    },
    program: {
      label: "The Program",
      title: "The Clinical Journey: Three Stages",
      intro:
        "Our journey begins about two months before departure for Peru and continues for six months afterward. It is a long-term commitment to deep healing.",
      phases: [
        {
          number: "01",
          badge: "Israel · 6 Weeks",
          title: "Preparation",
          items: [
            {
              title: "Personal Interviews",
              description:
                "An in-depth clinical assessment to evaluate candidacy and align expectations.",
            },
            {
              title: "Group Meetings",
              description:
                "Building trust and a sense of tribal closeness before departure.",
            },
            {
              title: "Kambo Cleansing",
              description:
                "A traditional, non-psychoactive Amazonian ceremony offered only after suitability is assessed and in accordance with safety protocols.",
              plant: true,
            },
            {
              title: "Breathwork (Rebirthing)",
              description:
                "For somatic regulation and access to suppressed emotions.",
            },
            {
              title: "Group and Individual Conversations",
              description:
                "Facilitated by clinical psychologists to create a safe container and begin engaging with emotional material.",
            },
          ],
        },
        {
          number: "02",
          badge: "Peru · 14 Days",
          title: "Amazonian Medicine Retreat in Peru",
          intro:
            "For two weeks, we step away from the noise of the modern world and enter the Peruvian Amazon rainforest—a secure, secluded environment with continuous support from the team.",
          image: "/tribe-guardians/img_maloka.jpg",
          imageAlt: "Retreat space in the Peruvian Amazon rainforest",
          highlight: true,
          items: [
            {
              title: "Ayahuasca and Amazonian Plant Medicines",
              description:
                "Guided by an experienced Peruvian medicine woman, and supported by a mentor team of combat veterans who have themselves been through a similar healing journey, alongside clinical therapists.",
              plant: true,
            },
            {
              title: "Daily Integration",
              description:
                "Group and individual meetings with clinical therapists to process material that arises during the journey.",
            },
            {
              title: "Holistic Activities",
              description: "Movement, communal cooking, and shared creativity.",
            },
            {
              title: "Individual Bodywork",
              description:
                "Support for physical and emotional release throughout the stay.",
            },
          ],
        },
        {
          number: "03",
          badge: "Israel · 6 Months",
          title: "Integration and Return to Life",
          intro:
            "The work continues in Israel so insights can be processed and integrated into daily life.",
          items: [
            {
              title: "Individual Integration",
              description:
                "Weekly individual meetings to process and support the integration journey.",
            },
            {
              title: "Group Integration Circles",
              description:
                "Six group integration meetings with fellow tribe members throughout the integration period.",
            },
            {
              title: "Group Alumni Meetings",
              description:
                "Meetings with participants from previous retreats to maintain connection, share experiences, and strengthen one another over time.",
            },
          ],
        },
      ],
    },
    pricing: {
      label: "Cost and What Is Included",
      title: "One Framework, Transparent Pricing",
      intro:
        "One payment brings every stage of the journey into a clear framework, from preparation in Israel through integration after returning home.",
      amount: "35,800",
      currency: "₪",
      amountLabel: "For every stage of the journey",
      included: [
        "Round-trip flights",
        "All preparation meetings",
        "Preparation retreat in Israel",
        "14-day retreat in Peru",
        "6 months of integration",
      ],
    },
    foundation: {
      label: "Our Foundation",
      title: "Zero Compromises",
      cards: [
        {
          title: "Legal Framework",
          description:
            "The activity takes place in Peru and operates within the local legal framework. Procedures, responsibilities, and insurance coverage are presented to candidates during screening.",
          icon: "legal",
        },
        {
          title: "Medical Safety",
          description:
            "A comprehensive protocol manual guides the team at every stage, alongside psychologists and mentors who have undergone a similar healing journey and served in combat units.",
          icon: "medical",
        },
        {
          title: "Code of Ethics",
          description:
            "We follow a professional code of conduct designed to maintain clear boundaries and protect participants.",
          icon: "ethics",
        },
      ],
      research: {
        label: "Research and Learning",
        title: "We Do More Than Treat. We Learn.",
        description:
          "We conduct internal research and aspire to future collaborations with academic researchers so we can evaluate the model systematically and improve it over time.",
        items: [
          {
            title: "Tools",
            text: "A multimodal design spanning psychological and social dimensions, using clinical tools",
          },
          {
            title: "Goal",
            text: "To deepen our understanding of what works and enable as many patients as possible to receive life-changing support",
          },
        ],
      },
    },
    apply: {
      imageAlt: "Amazon rainforest",
      label: "Apply",
      title: "Ready to Take the First Step?",
      description:
        "Choose the form that fits you. Your answers are personal, confidential, and non-binding; after submission, we will contact you to continue the introductory and suitability process.",
      applicant: {
        title: "Applicant Questionnaire",
        description:
          "For soldiers and fighters interested in participating in the program",
        icon: "applicant",
      },
      facilitator: {
        title: "Facilitator Questionnaire",
        description:
          "For mental-health professionals interested in joining the team",
        icon: "facilitator",
      },
    },
  },
};
