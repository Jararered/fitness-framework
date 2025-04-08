enum QuoteMode {
    GENTLE = "gentle",
    MODERATE = "moderate",
    HARDCORE = "hardcore",
    XXX = "xxx",
}

const GENTLE_QUOTES: { text: string; author: string }[] = [
    {
        text: "Every small step forward is still progress worth celebrating.",
        author: "Lily Chen",
    },
    {
        text: "Listen to your body, respect its limits, and gently push beyond them.",
        author: "Marcus Wells",
    },
    {
        text: "True strength comes from consistent effort, not occasional intensity.",
        author: "Sophia Rodriguez",
    },
    {
        text: "The journey to fitness is your own personal path, walk it at your own pace.",
        author: "Theo Bennett",
    },
    {
        text: "Each workout is a gift you give to yourself and your future self.",
        author: "Amara Johnson",
    },
    {
        text: "Growth happens in moments of discomfort, but never in moments of pain.",
        author: "Noah Parker",
    },
    {
        text: "Your body achieves what your mind believes is possible.",
        author: "Elena Kowalski",
    },
    {
        text: "Today's effort creates tomorrow's strength.",
        author: "James Wilson",
    },
    {
        text: "A balanced approach to fitness leads to sustainable results.",
        author: "Maya Patel",
    },
    {
        text: "Be kind to yourself while still challenging yourself to grow.",
        author: "Daniel Jefferson",
    },
];

const MODERATE_QUOTES = [
    {
        text: "Push yourself because no one else is going to do it for you.",
        author: "Alex Morgan",
    },
    {
        text: "The only bad workout is the one that didn't happen.",
        author: "Jordan Hayes",
    },
    {
        text: "Your excuses are lying to you. Your determination is telling the truth.",
        author: "Sasha Rivera",
    },
    {
        text: "Challenges are what make you stronger. Embrace them.",
        author: "Derek Thompson",
    },
    {
        text: "When you feel like quitting, remember why you started.",
        author: "Olivia Frost",
    },
    {
        text: "Success is earned through sweat, persistence, and a refusal to give up.",
        author: "Marcus Chen",
    },
    {
        text: "Don't count the reps. Make the reps count.",
        author: "Zoe Washington",
    },
    {
        text: "Your body can stand almost anything. It's your mind you have to convince.",
        author: "Ryan Patel",
    },
    {
        text: "The difference between try and triumph is just a little umph.",
        author: "Samantha King",
    },
    {
        text: "The clock is ticking. Are you becoming the person you want to be?",
        author: "Ethan Reynolds",
    },
];

const HARDCORE_QUOTES = [
    {
        text: "Pain is just weakness leaving your f***ing body. Embrace that s*** and grow!",
        author: "Victor Stone",
    },
    {
        text: "If you're not puking, bleeding, or crying, you're not training hard enough. Period.",
        author: "Max Powers",
    },
    {
        text: "The weights don't give a damn about your excuses, and neither should you.",
        author: "Dominic Steele",
    },
    {
        text: "Your body is begging you to stop? That's exactly when you need to do five more f***ing reps.",
        author: "Cynthia Vega",
    },
    {
        text: "Anyone can be comfortable. Greatness lives in those who embrace being f***ing uncomfortable.",
        author: "Jackson Fierce",
    },
    {
        text: "Either you make time for fitness now, or you make time for illness later. Choose your hard.",
        author: "Alexis Thunder",
    },
    {
        text: "Sweat like a pig, look like a god. It's that f***ing simple.",
        author: "Trent Hammer",
    },
    {
        text: "If it doesn't challenge you, it doesn't change you. So push until you want to die.",
        author: "Raven Steele",
    },
    {
        text: "Be so damn good they can't ignore you, and so strong they wouldn't dare try.",
        author: "Marcus Flex",
    },
    {
        text: "Your muscles should be screaming 'f*** you' by the end of your workout. That's how you know it worked.",
        author: "Diana Beast",
    },
];

const XXX_QUOTES = [
    {
        text: "Push through the pain—I told him to choke me harder than my student loans, and now I'm stronger for it.",
        author: "@CumLaudeCock",
    },
    {
        text: "Keep stretching your limits—my safe word is 'pineapple', but I powered through like a champ.",
        author: "@TwinkTorture69",
    },
    {
        text: "No excuses, just prep—I don't need lube when I've got the grit to keep going.",
        author: "@AssMasterXXX",
    },
    {
        text: "Tie up your doubts and lift—he bound me so tight I hit my peak twice before breaking free.",
        author: "@KinkyCumSlut",
    },
    {
        text: "Dig deep for that last rep—I asked for endurance, and he turned my core into a powerhouse.",
        author: "@PozzedPigBoy",
    },
    {
        text: "Sweat it out—he worked me over so hard my abs popped like a champagne cork.",
        author: "@JockJuicer",
    },
    {
        text: "Grip the bar like I gripped him—tight enough to leave marks and build muscle.",
        author: "@RopeRumpRider",
    },
    {
        text: "Power through the grind—his thrusts taught me stamina I didn't know I had.",
        author: "@HoleHustler",
    },
    {
        text: "Lift heavy, breathe deep—he pinned me down until I was gasping for gains.",
        author: "@ThrustThrobber",
    },
    {
        text: "Flex harder than he flexed me—bent over and still hitting PRs.",
        author: "@BendOverBeast",
    },
];

export const QUOTES = {
    [QuoteMode.GENTLE]: GENTLE_QUOTES,
    [QuoteMode.MODERATE]: MODERATE_QUOTES,
    [QuoteMode.HARDCORE]: HARDCORE_QUOTES,
    [QuoteMode.XXX]: XXX_QUOTES,
};

export { QuoteMode };
