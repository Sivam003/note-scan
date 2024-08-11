document.getElementById('open-camera').addEventListener('click', async function () {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    if (isMobile) {
        // On mobile, open the camera directly
        try {
            const constraints = { video: { facingMode: 'environment' } };
            const video = document.getElementById('video');
            const stream = await navigator.mediaDevices.getUserMedia(constraints);
            video.srcObject = stream;

            document.getElementById('camera-container').style.display = 'block';
        } catch (error) {
            alert('Error accessing the camera. Please allow camera permissions.');
        }
    } else {
        // On desktop, open the file picker
        document.getElementById('upload-image').click();
    }
});

document.getElementById('capture').addEventListener('click', function () {
    const canvas = document.getElementById('canvas');
    const video = document.getElementById('video');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0);
    const dataUrl = canvas.toDataURL('image/png');

    const img = document.getElementById('captured-image');
    img.src = dataUrl;
    img.style.display = 'block';

    // Stop the camera stream after capturing the image
    video.srcObject.getTracks().forEach(track => track.stop());
});

document.getElementById('upload-image').addEventListener('change', function (event) {
    const file = event.target.files[0];
    const img = document.getElementById('captured-image');
    img.src = URL.createObjectURL(file);
    img.style.display = 'block';
});
