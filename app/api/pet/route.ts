import { NextRequest } from "next/server";
import { getGitHubState } from "@/lib/github";
import { getPetState } from "@/lib/pet";

export async function GET(request: NextRequest) {
    const {searchParams} = new URL(request.url);
    const username = 
        searchParams.get("username") || 
        searchParams.get("user") || "Hn23911";
    let stats = {
        currentStreak: 0, 
        username: username, 
        totalCommits: 0, 
        longestStreak: 0,
    };
    try {
        const fetchedStats: any = await getGitHubState(username);
        if (fetchedStats) {
            stats = {
                currentStreak: fetchedStats.currentStreak ?? 0,
                username: fetchedStats.username || username,
                totalCommits: fetchedStats.totalCommits ?? 0,
                longestStreak: fetchedStats.longestStreak ?? 0,
            };
        }
    } catch (error) {
        console.error("Error fetching GitHub stats:", error);
    }

    const pet = getPetState(stats.currentStreak);

    const safeUsername = stats.username
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

    const svg = `
        <svg
            width="330"
            height="360"
            xmlns="http://www.w3.org/2000/svg"
        >
            <defs>
                <linearGradient id="bgGradient" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stop-color="#fff5fa"/>
                    <stop offset="100%" stop-color="#f7b4d1"/>
                </linearGradient>
                <linearGradient id="panelGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#a74675"/>
                    <stop offset="100%" stop-color="#81385f"/>
                </linearGradient>
                <filter id="pinkCat" color-interpolation-filters="sRGB">
                    <feColorMatrix
                        type="matrix"
                        values="0.949 0 0 0 0 0 0.716 0 0 0 0 0 1.542 0 0 0 0 0 1 0"
                    />
                </filter>
            </defs>

            <rect width="330" height="360" rx="14" fill="url(#bgGradient)"/>
            <path d="M49 72 C49 39 82 18 126 18
                C168 18 207 37 235 57 L265 32
                Q272 27 272 38 L272 105
                Q272 115 265 109 L235 86
                C207 106 168 126 126 126
                C82 126 49 105 49 72Z"
                fill="#111116"/>

            <text x="145" y="58"
                text-anchor="middle"
                fill="white"
                font-size="18"
                font-weight="bold"
                font-family="Arial, sans-serif">
                Commit Streak
            </text>

            <text x="145" y="94"
                text-anchor="middle"
                fill="white"
                font-size="29"
                font-weight="bold"
                font-family="Arial, sans-serif">
                ${stats.currentStreak}
                <tspan font-size="15"> Days</tspan>
            </text>

            ${pet.cat}

            <rect x="12" y="290" width="306" height="62" rx="12" fill="url(#panelGradient)"/>

            <text x="25" y="309" fill="white" font-size="12" font-family="Arial, sans-serif">
                User: ${safeUsername}
            </text>

            <text x="25" y="329" fill="white" font-size="12" font-family="Arial, sans-serif">
                Total Commits: ${stats.totalCommits}
            </text>

            <text x="25" y="349" fill="white" font-size="12" font-family="Arial, sans-serif">
                Longest streak: ${stats.longestStreak} days
            </text>
        </svg>
    `;
    
    return new Response(svg, {
        headers: {
            "Content-Type": "image/svg+xml; charset = utf-8",
            "Cache-Control": 
                "no-cache, no-store, must-revalidate",
        },
    });
}