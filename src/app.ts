import express from 'express';
import modules from './modules';


const app = express();

// Initialize all modules
modules.forEach((module) => module(app));

app.listen(8000, () => {
  console.log('Server is running on http://localhost:8000');
});

app.get('/', (req, res) => {
    res.send('Hello World yo');
})

export default app;
