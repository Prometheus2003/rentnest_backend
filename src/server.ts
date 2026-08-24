import app from './app';
import config from './config';

const PORT = process.env.PORT || 5000;
async function main() {
    try {
        app.listen(config.port, () => {
            console.log(`Server is running on port ${config.port}`);
        });
    } catch (err) {
        console.error('Error starting server:', err);
    }
}

main();