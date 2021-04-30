import axios from 'axios';
import {
    ConsoleLogger,
    DefaultDeviceController,
    DefaultMeetingSession,
    LogLevel,
    MeetingSessionConfiguration
} from 'amazon-chime-sdk-js';


export default class CallWrapper {
    constructor(endpoint, code) {
        this.endpoint = endpoint;
       

        // private
        this.session = null;  //From AWS SDK, intern prop för sdk'n
    }

    /**
     * Check if there is an active call
     *
     * @return  {Boolean}
     */
    hasActiveCall() {
        return this.session !== null;
    }

    /**
     * Connect to a chime meeting
     *
     *
     */
    async connectToChimeMeeting(relativeCode) {
        if (this.hasActiveCall()) {
            throw new Error('meeting session already in progress');
        }

        let meetingConfig;
        try {
            const response = await axios(this.endpoint+'/call/relative/'+relativeCode, { //
                headers: {                
                    'Content-Type':'application/json'
                }
            });
            meetingConfig = new MeetingSessionConfiguration(
                {
                    'Meeting': {
                        'MeetingId': response.data.meetingId,
                        'MediaPlacement': {
                            'AudioHostUrl': response.data.audioHostUrl,
                            'AudioFallbackUrl': response.data.audioFallbackUrl,
                            'ScreenDataUrl': response.data.screenDataUrl,
                            'ScreenSharingUrl': response.data.screenSharingUrl,
                            'ScreenViewingUrl': response.data.screenViewingUrl,
                            'SignalingUrl': response.data.signalingUrl,
                            'TurnControlUrl': response.data.turnControlUrl,
                        },
                    },
                },
                {
                    'Attendee': {
                        'ExternalUserId': response.data.externalUserId,
                        'AttendeeId': response.data.attendeeId,
                        'JoinToken': response.data.joinToken,
                    },
                }
            );
        } catch (e) {
            console.error('failed to connect to api');
            console.error(e);
            return;
        }

        const logger = new ConsoleLogger('Chime Logs', LogLevel.WARN);
        const deviceController = new DefaultDeviceController(logger);
        this.session = new DefaultMeetingSession(meetingConfig, logger, deviceController);
        console.log('successfully connected to chime meeting');
    }

    /**
     * Set the audio input device to the default microphone
     */
    async setAudioInputDeviceToDefault() {
        if (!this.hasActiveCall()) {
            throw new Error('no active meeting session');
        }

        // Sets it to the default device
        const availableAudioInputDevices = await this.session.audioVideo.listAudioInputDevices();
        const deviceId = availableAudioInputDevices[0].deviceId;
        await this.session.audioVideo.chooseAudioInputDevice(deviceId);
    }

    /**
     * Get a stream from the users webcam
     *
     * @return  {MediaStream}
     */
    async getVideoMediaStream() {
        if (!this.hasActiveCall()) {
            throw new Error('no active meeting session');
        }

        const stream = await window.navigator.mediaDevices.getUserMedia({
            audio: true,
            video: true,
        });
        return stream;
    }

    /**
     * Start streaming a media stream
     *
     * @param   {MediaStream}  videoStream
     */
    async broadcastVideo(videoStream) {
        if (!this.hasActiveCall()) {
            throw new Error('no active meeting session');
        }
        await this.session.audioVideo.startContentShare(videoStream);
    }

    /**
     * Start watching other streams
     */
    async startWatching() {
        if (!this.hasActiveCall()) {
            throw new Error('no active meeting session');
        }

        const observer = {
            /**
             * A video tile was updated
             *
             * @param   {VideoTile}  tile
             */
             videoTileDidUpdate: async tile => {
                console.log('Received a tile with id:', tile.tileId);

                // Should probably not do native DOM manipulation here
                let videoEl = document.getElementById(`tile-video-${tile.tileId}`);
                if (!videoEl) {
                    videoEl = document.createElement('video');
                    videoEl.setAttribute('id', `tile-video-${tile.tileId}`);

                    const parent = document.getElementById('tiles');
                    parent.appendChild(videoEl);
                }
                this.session.audioVideo.bindVideoElement(tile.tileId, videoEl);
            },
            audioVideoDidStart: () => {
                console.log('audioVideoDidStart');
            },
            audioVideoDidStop: sessionStatus => {
                console.log('audioVideoDidStop: ', sessionStatus.statusCode());
            },
        };

        this.session.audioVideo.addObserver(observer);

        const audioElement = document.getElementById('audio-out');
        this.session.audioVideo.bindAudioElement(audioElement);
        await this.session.audioVideo.start();
    }
}
