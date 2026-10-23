import { NextRequest } from "next/server";
import { getGitHubState } from "@/lib/github";
import { getPetState } from "@/lib/pet";
import { ASSETS } from "@/lib/assets";

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
            height="330"
            xmlns="http://www.w3.org/2000/svg"
        >
            <defs>
                <linearGradient 
                    id="bgGradient"
                    x1="0"
                    y1="0"
                    x2="1" 
                    y2="1"
                >
                    <stop offset="0%" stop-color="#1e3c72"/>
                    <stop offset="100%" stop-color="#2a5298"/>
                </linearGradient>
            </defs>

            <rect 
                width="330"
                height="330"
                rx="14"
                fill="url(#bgGradient)" 
            />

            <text x="165" y="30"
                text-anchor="middle"
                fill="white"
                font-size="21"
                font-weight="bold"
                font-family="Arial, sans-serif">
                Commit Streak
            </text>

            <text x="165" y="67"
                text-anchor="middle"
                fill="#ffe66d"
                font-size="30"
                font-weight="bold"
                font-family="Arial, sans-serif">
                ${stats.currentStreak}
                <tspan font-size="15"> days</tspan>
            </text>

            <image
                href="${pet.asset}"
                x="45"
                y="85"
                width="240"
                height="220"
                preserveAspectRatio="xMidYMid meet"
            />

            <image 
                href="${ASSETS.fish}"
                x="225"
                y="75"
                width="80"
                height="55"
                preserveAspectRatio="xMidYMid meet"
            />

            <rect x="12" y="250"
                width="306"
                height="70"
                rx="10"
                fill="#10264d"
                fill-opacity="0.88"

            <text 
                x="25" 
                y="270" 
                fill="white" 
                font-size="12">
                font-family="Arial, sans-serif">
                User: ${safeUsername}
            </text>

            <text 
                x="25"
                y="291"
                fill="white"
                font-size="12">
                font-family="Arial, sans-serif">
                Total Commits: ${stats.totalCommits}
            </text>

            <text 
                x="25"
                y="312"
                fill="white"
                font-size="12"
                font-family="Arial, sans-serif">
                    Longest streak: ${stats.longestStreak} days
            </text>
        </svg>
    `;
    
    return new Response(svg, {
        headers: {
            "Content-Type": "image/svg+xml, charset = utf-8",
            "Cache-Control": 
                "no-cache, no-store, must-revalidate",
        },
    });
}