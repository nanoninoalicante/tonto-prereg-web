const calculateTimeInReadable = (secs: number) => {
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${minutes}:${returnedSeconds}`;
};
const convertSeekTimeToAudioTime = (
    seekTime: Number,
    totalDurationInSeconds: Number
) => {
    return Number(totalDurationInSeconds) * (Number(seekTime) / 100);
};
const convertAudioTimeToSeekTime = (
    audioTimeInSeconds: Number,
    totalDurationInSeconds: Number
) => {
    return (Number(audioTimeInSeconds) / Number(totalDurationInSeconds)) * 100;
};
export function useAudioComposable() {
    return {
        calculateTimeInReadable,
        convertSeekTimeToAudioTime,
        convertAudioTimeToSeekTime,
    };
}
