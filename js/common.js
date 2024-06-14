
        document.addEventListener('DOMContentLoaded', function () {
            let faviconIndex = 1;
            const totalFavicons = 2; // Total number of favicons you have
            const changeInterval = 1000; // Change interval in milliseconds

            setInterval(() => {
                faviconIndex = (faviconIndex % totalFavicons) + 1;
                const favicon = document.getElementById('favicon');
                favicon.href = `./images/favicon/favicon${faviconIndex}.svg`;
            }, changeInterval);
        });

