const ResumeUtils = {
    uid: () => {
        const timestamp = new Date().getTime();

        // Generate a random 3-character alphanumeric string
        const randomString = Math.random().toString(36).substring(2, 5).toUpperCase();

        // Create the UID
        const uid = `resume-${timestamp}-${randomString}`;

        return uid;
    },
    getGithubLabel: (url) => {
        const regex = /(?:https?:\/\/)?(?:www\.)?github\.com\/([\w-]+)/i;

        const match = url.match(regex);
        if (match) {
            return `github.com/${match[1]}`;
        }
        return null; // Return null if it doesn't match
    },

    getLinkedinLabel: (url) => {
        const regex = /(?:https?:\/\/)?(?:www\.)?linkedin\.com\/in\/([\w-]+)/i;
        const match = url.match(regex);
        if (match) {
            return `linkedin.com/in/${match[1]}`;
        }
        return null; // Return null if it doesn't match
    },
    getBehanceLabel: (url) => {
        const regex = /(?:https?:\/\/)?(?:www\.)?behance\.net\/([\w-]+)/i;
        const match = url.match(regex);
        if (match) {
            return `behance.net/${match[1]}`;
        }
        return null; // Return null if it doesn't match
    },
    

}

export default ResumeUtils