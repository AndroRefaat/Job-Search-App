export const jobSocketHandler = (socket, io) => {
    socket.on("newApplication", ({ hrIds, jobTitle, jobId, applicantId }) => {
        hrIds.forEach((hrId) => {
            io.to(hrId.toString()).emit("newApplication", {
                message: `New application submitted for ${jobTitle}`,
                jobId,
                applicantId,
            });
        });
    });
};
