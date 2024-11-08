// Example group page to run on: https://fetlife.com/groups/210991/members

// stats summary counters
let already_blocked = 0;
let new_blocks = 0;

// get the group title
const linkElement = document.querySelector("a.link.text-red-500.hover\\:underline");
const title = linkElement ? linkElement.title : null;

// find the the highest page number from the pagination
const totalPagesMatch = document.querySelectorAll('a[href*="page="]');
const lastPage = totalPagesMatch[totalPagesMatch.length - 2]; // the last <a> is 'next', so grab the one before it
const lastPageNumber = lastPage ? lastPage.href.match(/page=(\d+)/)[1] : null;
console.log("Total pages to fetch: "+lastPageNumber)

// function to block a user and add a private not to their profile
async function blockUser(myID, blockedID, formAuthenticityToken) {
    console.log(`Blocking user: ${blockedID}`)

    // block user
    block_response = await fetch(`https://fetlife.com/users/${myID}/blockeds/from_object`, {
        method: 'POST',
        body: JSON.stringify({
            "authenticity_token":formAuthenticityToken,
            "user_id":myID,
            "blocked_object_type":"User",
            "blocked_object_id":blockedID //str
        }),
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
    });

    // XXX pseudo code, need to check actual text. Determine if user was already blocked
    const pageText = await block_response.text();
    if (pageText.includes('already blocked')) {
        already_blocked += 1;
    } else {
        new_blocks += 1;
    }

    console.log(`  Adding note -> Part of the group: ${title}, on page ${window.location.href}`)

    // add private note to account. use previous csrf token, its accepted
    await fetch(`https://fetlife.com/users/${myID}/profile/note`, {
        method: 'POST',
        body: JSON.stringify({
            "note":{
                "text":`Part of the group: ${title}, on page ${window.location.href}`,
                "notable_id":blockedID // int, not str
            }
        }),
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'x-csrf-token': formAuthenticityToken
        },
    });
}

// Main loop to fetch all pages and block users
for (let i = 1; i <= lastPageNumber; i++) {
    console.log(`Fetching page: ${i}/${lastPageNumber}`)
    // Grab the page
    const response = await fetch(`${window.location.href}?page=${i}`, { credentials: 'include' });
    const pageText = await response.text();

    // Parse the page content
    const parser = new DOMParser();
    const document = parser.parseFromString(pageText, 'text/html');

    // Grab the group members component
    const element = document.querySelector('div[data-component="GroupMembers"]');
    const groupInfo = element.getAttribute('data-props');

    for (const user of groupInfo['users']) {
        try {
            // Fetch the page content
            const response = await fetch(user['profilePath'], { credentials: 'include' });
            const pageText = await response.text();
            // Grab csrf token
            const tokenMatch = pageText.match(/"formAuthenticityToken":"(.*?)"/);
            const formAuthenticityToken = tokenMatch[1];

            blockUser(FL.user.id, user['id'], formAuthenticityToken);

        } catch (error) {
            console.log(`  Error processing ${user['nickname']}:`, error);
        }
    }
}

console.log("=====================================================")
console.log(`Group: ${title}`)
console.log(`Previously Blocked: ${already_blocked}`)
console.log(`New Blocks: ${new_blocks}`)
console.log("=====================================================")
