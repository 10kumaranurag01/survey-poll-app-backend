const express = require("express")
const { PrismaClient } = require("@prisma/client")

const router = express.Router();
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
    try {
        const allSurveys = await prisma.survey.findMany({})
        res.json({
            allSurveys
        })
    } catch (error) {
        res.send("Invalid")
    }
})

router.post("/", async (req, res) => {
    const { title, questions } = req.body

    try {
        const post = await prisma.survey.create({
            data: {
                title: title,
                questions: {
                    create: questions.map((question) => ({
                        text: question.text,
                        options: {
                            create: question.options.map((optionText) => ({
                                text: optionText
                            }))
                        }
                    }))
                }
            }

        })
        res.status(201).json({
            'new survey': post
        });
    } catch (error) {
        console.log(error)
        res.send("invalid")
    }
})

router.get("/:id", async (req, res) => {
    const surveyId = req.params.id

    try {
        const survey = await prisma.survey.findUnique({
            where: {
                id: parseInt(surveyId)
            },

            select: {
                id: true,
                title: true,
                questions: {
                    select: {
                        id: true,
                        text: true,
                        options: {
                            select: {
                                id: true,
                                text: true,
                                votes: true
                            }
                        }
                    }
                }
            }
        })

        res.json({
            survey
        })
    } catch (error) {
        console.log(error)
        res.send("Invalid")
    }
})

router.put("/:id", async (req, res) => {
    const { questionId, optionId } = req.body

    const questionIndex = parseInt(questionId)
    const optionIndex = parseInt(optionId)

    try {
        const option = await prisma.option.findUnique({
            where: {
                id: optionIndex,
                questionId: questionIndex
            }
        })
        if (!option) {
            res.status(404).json({ "msg": "Option not found" })
            return
        }

        const vote = await prisma.option.update({
            where: {
                id: optionIndex,
                questionId: questionIndex
            },
            data: {
                votes: option.votes + 1
            }
        })

        res.json({ vote })
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

router.delete("/:id", async (req, res) => {
    const surveyId = parseInt(req.params.id)

    try {
        const deletedSurvey = await prisma.survey.delete({
            where: {
                id: surveyId
            }
        })
        res.json({ deletedSurvey })
    } catch (error) {
        console.log(error)
        res.send(`Error while deleting survey with id:${surveyId}`)
    }
})

module.exports = router