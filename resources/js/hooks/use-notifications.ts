import {
    Pusher,
    PusherMember,
    PusherChannel,
    PusherEvent,
} from '@pusher/pusher-websocket-react-native';

const pusher = Pusher.getInstance();

await pusher.init({
    apiKey: "99b8dd49fa941f85bd1a",
    cluster: "ap1"
});

await pusher.connect();
await pusher.subscribe({
    channelName: "my-channel",
    onEvent: (event: PusherEvent) => {
        // In here make the alert when a fase has finished or comming or it´s in califications 
        // Wear alert of shadcn and the alert posicionated in right corner of page
        console.log(`Event received: ${event}`);
    }
});