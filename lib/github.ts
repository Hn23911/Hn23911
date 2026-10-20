export async function getGitHubState(username: string) {
    const query = ` 
        query($login: String!) {
            user(login: $login) {
                contributionsCollection {
                    contributionCalendar {
                        weeks {
                            contributionDays {
                                contributionCount
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

    const calendar = 
        json.data.user.contributionsCollection.contributionCalendar;

    const days = calendar.weeks.flatMap(
        (week: any) => week.contributionDays
    );

    const currentStreak = calculateCurrentStreak(days);

    return {
        currentStreak,
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
