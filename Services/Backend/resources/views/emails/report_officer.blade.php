<!DOCTYPE html>
<html>
<head>
    <title>Dynamic Content Email</title>
</head>
<body>
<h1 style="text-align: center; color: #007BFF;">Laporan dari Masyarakat</h1>
<table style="width: 100%; border-collapse: collapse;">
    <tr>
        <td style="padding: 10px; border: 1px solid #ccc; word-wrap: break-word; max-width: 200px;">
            <strong>NIP:</strong></td>
        <td style="padding: 10px; border: 1px solid #ccc; word-wrap: break-word;">{{ $nip }}</td>
    </tr>
    <tr>
        <td style="padding: 10px; border: 1px solid #ccc; word-wrap: break-word; max-width: 200px;">
            <strong>NAMA:</strong></td>
        <td style="padding: 10px; border: 1px solid #ccc; word-wrap: break-word;">{{ $name }}</td>
    </tr>
    <tr>
        <td style="padding: 10px; border: 1px solid #ccc; word-wrap: break-word; max-width: 200px;">
            <strong>TANGGAL LAHIR:</strong></td>
        <td style="padding: 10px; border: 1px solid #ccc; word-wrap: break-word;">{{ $birthdate }}</td>
    </tr>
    <tr>
        <td style="padding: 10px; border: 1px solid #ccc; word-wrap: break-word; max-width: 200px;">
            <strong>PESAN:</strong></td>
        <td style="padding: 10px; border: 1px solid #ccc; word-wrap: break-word;">{{ $emailMessage }}</td>
    </tr>
</table>
<p style="text-align: center; margin-top: 20px;"><strong>Foto Petugas:</strong></p>
<div style="text-align: center; border: 1px solid #ccc; padding: 10px;">
    <img src="{{ config('filesystems.disks.s3.url') . '/' . $image }}" alt="Image"
         style="max-width: 100%; height: auto;">
</div>
</body>
</html>
