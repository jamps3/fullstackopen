import express from 'express'
import notesRouter from './routes/notes.js'

const app = express()
app.use(express.json())
app.use(express.static('dist'))
app.use('/api/notes', notesRouter)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))