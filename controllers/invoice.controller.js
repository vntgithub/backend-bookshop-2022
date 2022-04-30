const Invoice = require('../models/invoice.model')
const Admin = require('../models/admin.model')

module.exports = {
    create: async (req, res) => {
        const invoiceData = { ...req.body, date: Date.parse(req.body.date), state: "Waitting" }
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
        console.log(userId)

        const invoices = await Invoice.find({ userId: userId })
        res.json(invoices)
    }
}