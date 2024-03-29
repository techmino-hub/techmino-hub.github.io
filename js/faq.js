addButtonListeners();

const faqLastUpdatedElement = document.getElementById('last-updated');
if(faqLastUpdatedElement !== undefined) {
    // fetch github api to get date of last edit of FAQ
    fetch('https://api.github.com/repos/techmino-hub/techmino-hub.github.io/commits?path=faq.html')
      .then(response => response.json())
    .then(json => {
        const lastUpdated = new Date(json[0].commit.committer.date);
        const currentDate = new Date();
        const timeDifference = currentDate - lastUpdated;
        let formattedDate;

        if (timeDifference < 60 * 60 * 1000) {
            const minutes = Math.floor(timeDifference / (60 * 1000));
            formattedDate = `${minutes} minutes ago`;
        } else if (timeDifference < 24 * 60 * 60 * 1000) {
            const hours = Math.floor(timeDifference / (60 * 60 * 1000));
            formattedDate = `${hours} hours ago`;
        } else {
            formattedDate = lastUpdated.toLocaleDateString('en-US', {
                year: "numeric",
                month: "long",
                day: "numeric"
            })
        }

        faqLastUpdatedElement.innerText = "Last updated: " + formattedDate;
    });
}

function addFAQEntries(faqObject) {
    faqObject.forEach(entry => {
        faqSection.innerHTML += faqHTML(entry);
    });

    addButtonListeners();
}

function addButtonListeners() {
    const questionHeaders = document.getElementsByClassName('question-header');
    for(let i = 0; i < questionHeaders.length; i++) {
        questionHeaders[i].addEventListener('click', () => {
            questionHeaders[i].parentElement.classList.toggle('expanded');
        });
    }
}

function faqHTML(entry) {
    return `<div class="question">
        <button class="question-header">
            <div class="question-icon-container">
                <svg class="question-icon" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M7 14l5-5 5 5z"></path>
                </svg>
            </div>
            <h2 class="question-title">${entry.question}</h2>
        </button>
        <div class="answer">
            ${entry.answerHTML}
            <div class="answer-source">— ${entry.author}</div>
        </div>
    </div>`;
}