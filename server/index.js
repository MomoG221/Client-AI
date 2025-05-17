require('dotenv').config();
const express = require('express');
const cors = require('cors');

const leadRoutes = require('./routes/leadRoutes');
const joinRoutes = require('./routes/joinRoutes');

const app = express();

app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:5173' }));
app.use(express.json());

app.use('/api/leads', leadRoutes);
app.use('/api/join', joinRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
