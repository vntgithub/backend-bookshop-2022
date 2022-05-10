const Invoice = require('../models/invoice.model')
const Admin = require('../models/admin.model')

module.exports = {
    create: async (req, res) => {
        const invoiceData = { ...req.body, date: Date.parse(req.body.date), state: "Waiting" }
        if (invoiceData.cart.length == 0)
            res.status(400).send("Cart is empty")
        else {
            const invoice = await Invoice.create(invoiceData)
                .catch(err => res.status(400).send(err))

            res.json(invoice)
        }
    },
    updateForAdmin: async (req, res) => {
        const invoiceId = req.params.id
        const invoiceAfterUpdate = await Invoice.findByIdAndUpdate(invoiceId, req.body, { new: true })
            .catch(err => res.status(400).send(err))
        res.json(invoiceAfterUpdate)
    },
    cancelInvoice: async (req, res) => {
        const invoiceAfterUpdate = await Invoice.findByIdAndUpdate(req.params.id, { state: "Cancel" }, { new: true })
            .catch(err => res.status(400).send(err))
        res.json(invoiceAfterUpdate)
    },
    getUserInvoices: async (req, res) => {
        const userId = req.user.userId

        const invoices = await Invoice.find({ userId: userId }).sort({ date: -1 })
        res.json(invoices)
    },
    getInvoices: async (req, res) => {
        const page = req.query.page || 0
        const invoices = await Invoice.find().sort({ date: -1 }).skip(page * 15)
            .limit(15)
        const count = await Invoice.countDocuments()
        res.json({ invoices, count: Math.floor(count / 20) })
    }
}