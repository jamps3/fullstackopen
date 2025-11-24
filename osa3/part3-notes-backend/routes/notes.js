import { Router } from 'express'
import generateId from '../utils/generateId.js'

const router = Router()

let notes = [
  { id: "1", content: "HTML is easy", important: true },
  { id: "2", content: "Browser can execute only JavaScript", important: false },
  { id: "3", content: "GET and POST are the most important methods of HTTP protocol", important: true }
]

router.get('/', (req, res) => res.json(notes))

router.get('/:id', (req, res) => {
  const note = notes.find(n => n.id === req.params.id)
  note ? res.json(note) : res.status(404).end()
})

router.post('/', (req, res) => {
  const { content, important } = req.body
  if (!content) return res.status(400).json({ error: 'content missing' })

  const note = { id: generateId(notes), content, important: important || false }
  notes = notes.concat(note)
  res.json(note)
})

router.put('/:id', (req, res) => {
  const id = req.params.id
  const { important } = req.body

  const note = notes.find(n => n.id === id)
  if (!note) {
    return res.status(404).json({ error: 'note not found' })
  }

  const updatedNote = { ...note, important }
  notes = notes.map(n => n.id === id ? updatedNote : n)

  res.json(updatedNote)
})

router.delete('/:id', (req, res) => {
  notes = notes.filter(n => n.id !== req.params.id)
  res.status(204).end()
})

export default router