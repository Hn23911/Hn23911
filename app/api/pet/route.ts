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
                <linearGradient id="bgGradient" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stop-color="#fff5fa"/>
                    <stop offset="100%" stop-color="#f7b4d1"/>
                </linearGradient>
                <linearGradient id="panelGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#a74675"/>
                    <stop offset="100%" stop-color="#81385f"/>
                </linearGradient>
            </defs>

            <rect width="330" height="330" rx="14" fill="url(#bgGradient)"/>
            <circle cx="28" cy="92" r="3" fill="#fff" fill-opacity=".7"/>
            <circle cx="303" cy="115" r="4" fill="#fff" fill-opacity=".75"/>
            <path d="M35 145 l3 7 7 3-7 3-3 7-3-7-7-3 7-3z M294 172 l2 5 5 2-5 2-2 5-2-5-5-2 5-2z"
                fill="#fff" fill-opacity=".78"/>

            <text x="165" y="31"
                text-anchor="middle"
                fill="#71334f"
                font-size="20"
                font-weight="bold"
                font-family="Arial, sans-serif">
                Commit Streak
            </text>

            <text x="165" y="66"
                text-anchor="middle"
                fill="#a43f70"
                font-size="29"
                font-weight="bold"
                font-family="Arial, sans-serif">
                ${stats.currentStreak}
                <tspan font-size="15"> days</tspan>
            </text>

            <image 
                href="${ASSETS.fish}"
                x="143"
                y="75"
                width="44"
                height="22"
                preserveAspectRatio="xMidYMid meet"
            />

            ${pet.cat}

            <rect x="12" y="253" width="306" height="67" rx="12" fill="url(#panelGradient)"/>

            <text x="25" y="274" fill="white" font-size="12" font-family="Arial, sans-serif">
                User: ${safeUsername}
            </text>

            <text x="25" y="294" fill="white" font-size="12" font-family="Arial, sans-serif">
                Total Commits: ${stats.totalCommits}
            </text>

            <text x="25" y="314" fill="white" font-size="12" font-family="Arial, sans-serif">
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