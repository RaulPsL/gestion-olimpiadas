<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class FaseNotification extends Notification
{
    use Queueable;

    protected $data;
    /**
     * Create a new notification instance.
     */
    public function __construct($usuario)
    {
        $this->data = $usuario;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via($notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail($notifiable): MailMessage
    {
        $usuario = $this->data['usuario'];
        $password = $this->data['password'];
        $rol = $usuario->roles->first()->nombre;
        $nombre = "$usuario->nombre $usuario->apellido";
        $areas = implode(',', $usuario->areas->map(function ($area) {
            return $area->nombre;
        })->toArray());
        return (new MailMessage)
            ->subject('Mensaje de O!SanSi')
            ->greeting("Buenos días $nombre.")
            ->line('Bienvenido a las olimiadas cientificas de la Universidad Mayor de San Simon')
            ->line("Usted ha sido asignado como $rol, en las siguientes areas: $areas")
            ->action('Puedes ver tus áreas asignadas al ingresar a esta direccion', url('/login'))
            ->line('mediante sus creadenciales:')
            ->line("ci: $usuario->ci")
            ->line("password: $password")
            ->line('¡Gracias por sus servicios en las olimpiadas!');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
