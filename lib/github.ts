type ContributionDay = {
    contributionCount: number;
    date: string;
};

export async function getGitHubState(username: string) {
    const token = process.env.GITHUB_TOKEN;

    if (!token) {
        throw new Error("Missing GITHUB_TOKEN environment variable");
    }
    const query = ` 
        query($login: String!) {
            user(login: $login) {
                contributionsCollection {
                    totalCommitContributions
                    contributionCalendar {
                        weeks {
                            contributionDays {
                                contributionCount
                                date
                            }   
                        }
                    }
                }
            }
        }
    `;

    const res = await fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            query,
            variables: {
                login: username,
            },
        }),
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error(`GitHub API HTTP error: ${res.status}`);
    }

    const json = await res.json();

    if (json.error?.length) {
        throw new Error(
            `GitHub GraphQL error: ${JSON.stringify(json.errors)}`
        );
    }

    const user = json.data?.user;

    if (!user) {
        throw new Error(`GitHub user not found: ${username}`);
    }

    const collection = user.contributionsCollection;
    const totalCommits = 
        collection.totalCommitContribution ?? 0;

    const days : ContributionDay[] = 
        collection.contributionCalendar.weeks.flatMap(
            (week: {contributionDays: ContributionDay[] }) =>
                week.contributionDays
        );

    return {
        username,
        currentStreak: calculateCurrentStreak(days),
        totalCommits,
        longestStreak: calculateCurrentStreak(days),
    };
}
    function calculateCurrentStreak(days: ContributionDay[]) {

        let streak = 0;

        const reversed = [...days].reverse();

        let startIndex = 0;

        // Hom nay khong co contribution thi kiem tra tu hom qua
        if (
            reversed.length > 0 &&
            reversed[0].contributionCount === 0
        ) {
            startIndex = 1;
        }

        for (let i = startIndex; i < reversed.length; i++) {
            if (reversed[i].contributionCount > 0) {
                streak++;
            } else {
                break;
            }
       }
        return streak;
    }

    function calculateLongestStreak(days: ContributionDay[]) {
        let maxStreak = 0;
        let current = 0;

        for (const day of days) {
            if (day.contributionCount > 0) {
                current++;
                maxStreak = Math.max(maxStreak, current);
            } else {
                current = 0;
            }
        }

        return maxStreak;
}
