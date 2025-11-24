import React from "react";
import Pusher from "pusher-js";
import { toast } from "sonner";

export const useNotification = (userCi: string) => {
    const pusher = new Pusher("99b8dd49fa941f85bd1a", {
        cluster: 'ap1',
    });
    const channel = pusher.subscribe(`user.${userCi}`);
    console.log('Enviando los evento')
    channel.bind("my-event", (data: any) => {
        console.log("Notificacion entregada con exito: ", data.message);
        toast("Notificación", {
            description: data.message,
        });
});

return () => {
    pusher.unsubscribe(`user.${userCi}`);
    pusher.disconnect();
};
}