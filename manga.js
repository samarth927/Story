document.getElementById('imageUpload').addEventListener('change', function(event) {
    const file = event.target.files[0];
    const mangaContainer = document.getElementById('mangaContainer');
    mangaContainer.innerHTML = ''; // Clear previous images

    if (file && file.type === 'application/pdf') {
        const fileReader = new FileReader();
        fileReader.onload = function() {
            const typedarray = new Uint8Array(this.result);
            pdfjsLib.getDocument(typedarray).promise.then(pdf => {
                const numPages = pdf.numPages;
                for (let i = 1; i <= numPages; i++) {
                    pdf.getPage(i).then(page => {
                        const viewport = page.getViewport({ scale: 1 });
                        const canvas = document.createElement('canvas');
                        const context = canvas.getContext('2d');
                        canvas.height = viewport.height;
                        canvas.width = viewport.width;
                        mangaContainer.appendChild(canvas);

                        const renderContext = {
                            canvasContext: context,
                            viewport: viewport
                        };
                        page.render(renderContext);
                    });
                }
            });
        };
        fileReader.readAsArrayBuffer(file);
    } else {
        alert('Please upload a valid PDF file.');
    }
});

// Night mode and light mode toggle
const modeToggle = document.getElementById('modeToggle');
modeToggle.addEventListener('click', function() {
    document.body.classList.toggle('night-mode');
    if (document.body.classList.contains('night-mode')) {
        modeToggle.textContent = 'Switch to Light Mode';
    } else {
        modeToggle.textContent = 'Switch to Night Mode';
    }
});

// Autoscroll functionality
let autoscrollInterval;
const autoscrollToggle = document.getElementById('autoscrollToggle');
autoscrollToggle.addEventListener('click', function() {
    if (autoscrollInterval) {
        clearInterval(autoscrollInterval);
        autoscrollInterval = null;
        autoscrollToggle.textContent = 'Start Autoscroll';
    } else {
        autoscrollInterval = setInterval(() => {
            window.scrollBy(0, 1); // Scroll down by 1 pixel
        }, 10000); // Set to 10 seconds
        autoscrollToggle.textContent = 'Stop Autoscroll';
    }
});
