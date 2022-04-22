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
        const adminId = req.user.userId
        const admin = await Admin.findById(adminId)
        if (admin) {
            const invoiceId = req.params.id
            const invoiceAfterUpdate = await Invoice.findByIdAndUpdate(invoiceId, req.body, { new: true })
                .catch(err => res.status(400).send(err))
            res.json(invoiceAfterUpdate)
        } else {
            res.status(401).send("Unauthorized")
        }
    },
    updateForUser: async (req, res) => {
        const adminId = req.user.userId
        const admin = await Admin.findById(adminId)
        if (admin) {
            const invoiceId = req.params.id
            const invoiceAfterUpdate = await Invoice.findByIdAndUpdate(invoiceId, req.body, { new: true })
                .catch(err => res.status(400).send(err))
            res.json(invoiceAfterUpdate)
        } else {
            res.status(401).send("Unauthorized")
        }
    },
}