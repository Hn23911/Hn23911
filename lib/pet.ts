import { ASSETS } from "@/lib/assets";

type PetMood = "sleeping" | "cheerful" | "blushing" | "excited" | "ecstatic";

type PetState = {
    mood: PetMood;
    cat: string;
};

const faceMask = `
    <circle cx="40" cy="53" r="6" fill="#f28bb9"/>
    <circle cx="80" cy="53" r="6" fill="#f28bb9"/>
    <ellipse cx="61" cy="55" rx="10" ry="12" fill="#f28bb9"/>
`;

const expressions: Record<Exclude<PetMood, "cheerful">, string> = {
    sleeping: `
        ${faceMask}
        <path d="M34 53 q6 5 12 0 M74 53 q6 5 12 0"
            fill="none" stroke="#573449" stroke-width="2.5" stroke-linecap="round"/>
        <path d="M57 52 l4 4 4-4z" fill="#573449"/>
        <path d="M61 56 q-3 5 -7 3 M61 56 q3 5 7 3"
            fill="none" stroke="#573449" stroke-width="2" stroke-linecap="round"/>
    `,
    blushing: `
        ${faceMask}
        <path d="M33 53 q7 6 14 0 M73 53 q7 6 14 0"
            fill="none" stroke="#573449" stroke-width="2.5" stroke-linecap="round"/>
        <path d="M57 52 l4 4 4-4z" fill="#573449"/>
        <path d="M61 56 q-3 6 -8 3 M61 56 q3 6 8 3"
            fill="none" stroke="#573449" stroke-width="2" stroke-linecap="round"/>
        <ellipse cx="25" cy="68" rx="7" ry="4" fill="#ee729f"/>
        <ellipse cx="97" cy="68" rx="7" ry="4" fill="#ee729f"/>
    `,
    excited: `
        ${faceMask}
        <path d="M40 43 l3 7 7 1-5 4 2 7-7-4-7 4 2-7-5-4 7-1z
            M80 43 l3 7 7 1-5 4 2 7-7-4-7 4 2-7-5-4 7-1z"
            fill="#fff4b8"/>
        <ellipse cx="61" cy="62" rx="6" ry="8" fill="#573449"/>
        <path d="M58 67 q3 2 6 0" fill="none" stroke="#f28bb9" stroke-width="1.5"/>
        <ellipse cx="25" cy="68" rx="7" ry="4" fill="#ee729f"/>
        <ellipse cx="97" cy="68" rx="7" ry="4" fill="#ee729f"/>
    `,
    ecstatic: `
        ${faceMask}
        <path d="M40 58 C22 45 34 36 40 46 C46 36 58 45 40 58z
            M80 58 C62 45 74 36 80 46 C86 36 98 45 80 58z"
            fill="#fff4b8"/>
        <ellipse cx="61" cy="62" rx="7" ry="9" fill="#573449"/>
        <path d="M58 68 q3 2 6 0" fill="none" stroke="#f28bb9" stroke-width="1.5"/>
        <ellipse cx="25" cy="68" rx="8" ry="5" fill="#ee729f"/>
        <ellipse cx="97" cy="68" rx="8" ry="5" fill="#ee729f"/>
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
    const expression = mood === "cheerful" ? "" : expressions[mood];

    return {
        mood,
        cat: `
            <image
                href="${ASSETS.awakeCat}"
                x="49"
                y="132"
                width="232"
                height="151"
                preserveAspectRatio="none"
                filter="url(#pinkCat)"
            />
            <g transform="translate(49 132)" stroke-linecap="round" stroke-linejoin="round">
                ${expression}
            </g>
        `,
    };
}
