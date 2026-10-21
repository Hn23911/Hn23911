import { getGitHubState } from "@/lib/github";
import { getPetState } from "@/lib/pet";
import { ASSETS } from "@/lib/assets";

export async function GET() {
    const stats = { currentStreak: 10, username: "Hn23911", totalCommits: 123, longestStreak: 15};
    const pet = getPetState(stats.currentStreak);

    const svg = `
        <svg
            width="330"
            height="330"
            xmlns="http://www.w3.org/2000/svg"
        >
            <dref>
                <linearGradient 
                    id="bgGradient"
                    x1="0"
                    y1="0"
                    x2="1" 
                    y2="1"
                >
                    <stop offset="0%"
                    stop-color="#1e3c72"
                    <stop offset="100%"
                    stop-color="#2a5298"
                </linearGradient>
            </dref>
            <rect 
                width="100%"
                height="100%"
                fill="url(#bgGradient)" />

            <image
                href="${pet.asset}"
                x="30"
                y="90"
                width="250"
                height="250"
            />

            <image 
                href="${ASSETS.fish}"
                x="33"
                y="20"
                width="250"
                height="110"
            />

            <text
                x="170"
                y="50"
                text-anchor="middle"
                fill="black"
                font-size="20"
                font-wight="bold"
                font-family="Arial, sans-serif"
            >
                ${stats.currentStreak > 10
                    ? `<animate attributeName="fill"
                        values="white;yellow;white" 
                        dur="1s" 
                        repeatCount="indefinite" />`
                    : ""}
                Commit Streak
            </text>

            <text
                x="90"
                y="105"
                fill="black"
                font-family="Arial, sans-serif"
            >
                <tspan font-size="32" font-weight="bold">
                    ${stats.currentStreak}
                </tspan>

                <tspan font-size="16" font-weight="bold">
                    Days
                </tspan>
            </text>

            <text 
                x="70" 
                y="180" 
                fill="black" 
                font-size="14">
                    User: ${stats.username}
            </text>

            <text 
                x="70"
                y="200"
                fill="black"
                font-size="14">
                    Total Commits: $stats.totalCommits}
            </text>

            <text 
                x="70"
                y="220"
                fill="black"
                font-size="14">
                    Longest streak: ${stats.longestStreak} days
            </text>
        </svg>
    `;
    
    return new Response(svg, {
        headers: {
            "Content-Type": "image/svg+xml",
        },
    });
}