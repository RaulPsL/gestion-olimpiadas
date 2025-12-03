import React from "react";
import Pusher from "pusher-js";

export const useAutoUpdate = () => {
    React.useEffect(() => {
        const pusher = new Pusher("99b8dd49fa941f85bd1a", {
            cluster: 'ap1',
        });
        const channel = pusher.subscribe(`local`);
        console.log('Enviando la actualizacion')
        channel.bind("my-event", () => { });

        return () => {
            pusher.unsubscribe(`local`);
            pusher.disconnect();
        };
    }, []);

}