<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class AcceptRequest implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $friendChannel;
    public $userId;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct($friendChannel, $userId)
    {
        $this->friendChannel = $friendChannel;
        $this->userId = $userId;

    }

    public function broadcastWith() {
        return [ '0' => $this->friendChannel];
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new PresenceChannel('event.acceptRequest.'.$this->userId);
    }
}
