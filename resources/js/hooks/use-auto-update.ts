import React from "react";
import Pusher from "pusher-js";

export const useAutoUpdate = (onUpdate?: () => void) => {
    React.useEffect(() => {
        const pusher = new Pusher("99b8dd49fa941f85bd1a", {
            cluster: 'ap1',
        });
        const channel = pusher.subscribe(`local`);
        console.log('Suscrito a actualizaciones de fases');
        
        channel.bind("my-event", (data: any) => {
            console.log('Evento de actualización recibido:', data);
            if (onUpdate) {
                onUpdate();
            }
        });

        return () => {
            pusher.unsubscribe(`local`);
            pusher.disconnect();
        };
    }, [onUpdate]);

}