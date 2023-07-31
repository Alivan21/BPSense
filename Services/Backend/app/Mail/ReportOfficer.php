<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ReportOfficer extends Mailable
{
    use Queueable, SerializesModels;

    public $nip;
    public $birthdate;
    public $image;
    public $message;

    /**
     * Create a new message instance.
     *
     * @param string $nip
     * @param string $name
     * @param string $birthdate
     * @param string $image
     * @param string $message
     *
     */
    public function __construct($nip, $name, $birthdate, $image, $message)
    {
        $this->nip = $nip;
        $this->name = $name;
        $this->birthdate = $birthdate;
        $this->image = $image;
        $this->message = $message;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
//        dd($this->image);
        return $this->view('emails.report_officer')
            ->subject('Laporan dari User')
            ->with([
                'nip' => $this->nip,
                'name' => $this->name,
                'birthdate' => $this->birthdate,
                'emailMessage' => $this->message,
                "image" => $this->image,
            ]);
    }
}
