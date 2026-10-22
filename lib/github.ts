export async function getGitHubState(username: string) {
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
            "Authorization": `Bearer ${process.env.GITHUB_TOKEN}`,
        },
        body: JSON.stringify({
            query,
            variables: {
                login: username,
            },
        }),
    });

    const json = await res.json();

    const user = json.data?.user;
    if (!user) {
        return { currentStreak: 0, totalCommits: 0, longestStreak: 0, username};
    }

    const collection = user.contributionsCollection;
    const totalCommits = collection.totalCommitContribution || 0;

    const calendar = collection.contributionsCalendar;
    const days = calendar.weeks.flatMap(
        (week: any) => week.contributionDays
    );

    const currentStreak = calculateCurrentStreak(days);
    const longestStreak = calculateLongestStreak(days);

    return {
        username,
        currentStreak,
        totalCommits,
        longestStreak,
    };

    function calculateCurrentStreak(days: any[]) {
        let streak = 0;

        const reversed = [...days].reverse();

        let startIndex = 0;

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
}
    function calculateLongestStreak(days: any[]) {
        let maxStreak = 0;
        let current = 0;
        for (const day of days) {
            if (day.contributionCount > 0) {
                current++;
                if(current > maxStreak) maxStreak = current;
            } else {
                current = 0;
            }
        }
        return maxStreak;
    }
