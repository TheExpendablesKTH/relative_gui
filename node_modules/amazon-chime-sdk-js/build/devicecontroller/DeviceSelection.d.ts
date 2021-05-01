export default class DeviceSelection {
    constraints: MediaStreamConstraints;
    stream: MediaStream;
    groupId: string;
    endedCallback?: undefined | (() => void);
    matchesConstraints(constraints: MediaStreamConstraints): boolean;
}
