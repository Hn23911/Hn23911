type PetMood = "sleeping" | "cheerful" | "blushing" | "excited" | "ecstatic";

type PetState = {
    mood: PetMood;
    cat: string;
};

const expressions: Record<PetMood, string> = {
    sleeping: `
        <path d="M-34 -11 Q-25 -3 -16 -11 M16 -11 Q25 -3 34 -11"
            fill="none" stroke="#573449" stroke-width="4" stroke-linecap="round"/>
        <path d="M0 5 l-5 5 h10 z" fill="#b94d7a"/>
        <path d="M0 10 q-3 5 -8 3 M0 10 q3 5 8 3"
            fill="none" stroke="#573449" stroke-width="2.5" stroke-linecap="round"/>
        <text x="44" y="-49" fill="#a74478" font-size="17" font-weight="bold"
            font-family="Arial, sans-serif">z</text>
        <text x="54" y="-63" fill="#a74478" font-size="12" font-weight="bold"
            font-family="Arial, sans-serif">z</text>
    `,
    cheerful: `
        <ellipse cx="-24" cy="-10" rx="5" ry="7" fill="#573449"/>
        <ellipse cx="24" cy="-10" rx="5" ry="7" fill="#573449"/>
        <path d="M-4 5 l4 4 4-4z" fill="#b94d7a"/>
        <path d="M0 9 q-4 8 -11 4 M0 9 q4 8 11 4"
            fill="none" stroke="#573449" stroke-width="2.5" stroke-linecap="round"/>
        <circle cx="-42" cy="3" r="7" fill="#f48eb7" fill-opacity=".72"/>
        <circle cx="42" cy="3" r="7" fill="#f48eb7" fill-opacity=".72"/>
    `,
    blushing: `
        <path d="M-34 -9 q10 12 20 0 M14 -9 q10 12 20 0"
            fill="none" stroke="#573449" stroke-width="3.5" stroke-linecap="round"/>
        <path d="M-4 5 l4 4 4-4z" fill="#b94d7a"/>
        <path d="M0 9 q-4 8 -11 4 M0 9 q4 8 11 4"
            fill="none" stroke="#573449" stroke-width="2.5" stroke-linecap="round"/>
        <ellipse cx="-42" cy="3" rx="9" ry="6" fill="#ee729f" fill-opacity=".85"/>
        <ellipse cx="42" cy="3" rx="9" ry="6" fill="#ee729f" fill-opacity=".85"/>
        <path d="M-56 -27 q-7 -8 -12 0 M56 -27 q7 -8 12 0"
            fill="none" stroke="#f08ab5" stroke-width="3" stroke-linecap="round"/>
    `,
    excited: `
        <path d="M-32 -17 l5 7 8-2-5 7 5 7-8-2-5 7-1-8-8-2 8-3z"
            fill="#fff4b8" stroke="#c26a91" stroke-width="1.5"/>
        <path d="M32 -17 l5 7 8-2-5 7 5 7-8-2-5 7-1-8-8-2 8-3z"
            fill="#fff4b8" stroke="#c26a91" stroke-width="1.5"/>
        <path d="M-4 4 l4 4 4-4z" fill="#b94d7a"/>
        <ellipse cx="0" cy="15" rx="8" ry="6" fill="#9e3d68"/>
        <path d="M-46 1 q-6-4-10 0 M46 1 q6-4 10 0"
            fill="none" stroke="#573449" stroke-width="2" stroke-linecap="round"/>
        <circle cx="-42" cy="4" r="6" fill="#f48eb7" fill-opacity=".72"/>
        <circle cx="42" cy="4" r="6" fill="#f48eb7" fill-opacity=".72"/>
    `,
    ecstatic: `
        <path d="M-35 -13 c-8-11-21 1 0 16 21-15 8-27 0-16z"
            fill="#fff4b8" stroke="#c45c8c" stroke-width="1.5"/>
        <path d="M35 -13 c-8-11-21 1 0 16 21-15 8-27 0-16z"
            fill="#fff4b8" stroke="#c45c8c" stroke-width="1.5"/>
        <path d="M-4 4 l4 4 4-4z" fill="#b94d7a"/>
        <ellipse cx="0" cy="15" rx="10" ry="8" fill="#9e3d68"/>
        <path d="M-48 2 q-7-4-12 0 M48 2 q7-4 12 0"
            fill="none" stroke="#573449" stroke-width="2" stroke-linecap="round"/>
        <ellipse cx="-43" cy="6" rx="8" ry="6" fill="#ee729f"/>
        <ellipse cx="43" cy="6" rx="8" ry="6" fill="#ee729f"/>
        <path d="M-18 -61 L-19 -78 L-9 -69 L0 -84 L9 -69 L19 -78 L18 -61Z"
            fill="#ffd66b" stroke="#cc8b4f" stroke-width="2"/>
        <path d="M-5 -64 l5-7 5 7z" fill="#fff4b8"/>
    `,
};

const moods: { from: number; mood: PetMood }[] = [
    {from: 30, mood: "ecstatic"},
    {from: 14, mood: "excited"},
    {from: 7, mood: "blushing"},
    {from: 1, mood: "cheerful"},
    {from: 0, mood: "sleeping"},
];

export function getPetState(streak: number): PetState {
    const mood = moods.find((state) => streak >= state.from)?.mood ?? "sleeping";
    const expression = expressions[mood];

    return {
        mood,
        cat: `
            <g transform="translate(165 170)" stroke-linejoin="round">
                <path d="M34 34 C74 39 70 76 43 75 C27 74 31 58 44 59"
                    fill="none" stroke="#d95891" stroke-width="12" stroke-linecap="round"/>
                <ellipse cx="0" cy="44" rx="43" ry="39" fill="#f28bb9"/>
                <ellipse cx="-20" cy="72" rx="12" ry="8" fill="#f8b5d1"/>
                <ellipse cx="20" cy="72" rx="12" ry="8" fill="#f8b5d1"/>
                <path d="M-31 31 Q-49 14 -51 1 M31 31 Q49 14 51 1"
                    fill="none" stroke="#ed80ae" stroke-width="13" stroke-linecap="round"/>
                <path d="M-58 -18 L-69 -66 Q-70 -71 -65 -68 L-26 -45
                    Q0 -64 26 -45 L65 -68 Q70 -71 69 -66 L58 -18
                    Q66 8 44 25 Q25 40 0 36 Q-25 40 -44 25 Q-66 8 -58 -18Z"
                    fill="#f28bb9" stroke="#d95891" stroke-width="3"/>
                <path d="M-60 -55 L-49 -27 L-32 -44Z M60 -55 L49 -27 L32 -44Z"
                    fill="#ffd2e4"/>
                <ellipse cx="0" cy="17" rx="20" ry="13" fill="#fff4f8"/>
                <g stroke="none">${expression}</g>
                <path d="M-59 -1 l-23 -5 M-59 8 l-25 2 M59 -1 l23 -5 M59 8 l25 2"
                    fill="none" stroke="#a94c76" stroke-width="2" stroke-linecap="round"/>
                <path d="M-17 32 Q0 44 17 32" fill="none" stroke="#d95891"
                    stroke-width="3" stroke-linecap="round"/>
                <path d="M-8 39 Q0 45 8 39" fill="none" stroke="#fff4f8"
                    stroke-width="3" stroke-linecap="round"/>
            </g>
        `,
    };
}
