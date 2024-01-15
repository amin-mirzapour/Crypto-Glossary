import { keywords } from "../../data/keywords"

export default function handler(req, res) {
    try {
        res.status(200).json(keywords)
    } catch (error) {
        res.status(500).json({ error: 'faild to load data' })
    }
}