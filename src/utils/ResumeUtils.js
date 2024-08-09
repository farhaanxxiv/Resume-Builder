const ResumeUtils = {
    uid: () => {
        const timestamp = new Date().getTime();

        // Generate a random 3-character alphanumeric string
        const randomString = Math.random().toString(36).substring(2, 5).toUpperCase();

        // Create the UID
        const uid = `resume-${timestamp}-${randomString}`;

        return uid;
    }
}

export default ResumeUtils