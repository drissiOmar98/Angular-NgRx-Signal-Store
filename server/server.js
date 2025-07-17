require('dotenv').config()
const express = require('express');
const bodyParser = require("body-parser");
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());


app.post('/api/payment/create-checkout-session/', async (req, res) => {
    const items = req.body.items;
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: items.map(item => ({
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: item.name,
                        description: item.description,
                        images: item.images
                    },
                    unit_amount: item.price * 100
                },
                quantity: item.quantity
            })),
            success_url: process.env.SUCCESS_URL,
            cancel_url: process.env.CANCEL_URL,
        });
        res.json({ url: session.url })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
});

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Server running on port ${port}`))