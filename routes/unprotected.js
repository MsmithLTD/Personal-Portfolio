
const { Router } = require('express');

class Unprotected{
    constructor(){
        this.router = Router();
        this.initGet();
    }

    initGet(){
        this.router.get("/", (req, res) => {
            res.render('home');
        })
        this.router.get("/about", (req,res) =>{
            res.render('about')
        })
        this.router.get("/account", (req, res) => {
            res.render('account');
        });
        this.router.get("/bookATable", (req, res) => {
            res.render('bookATable');
        });
        this.router.get("/lessons", (req, res) =>{
            res.render('lessons');
        })
        this.router.get('/hampers', (req, res) => {
            res.render('hampers');
        })
        this.router.get("/order", (req,res) =>{
            res.render('order');
        });
        this.router.get('/basket', (req, res) => {
            res.render('basket');
        
            // Calculate the total price
            const totalPrice = basket.reduce((sum, item) => sum + (item.price || 0), 0);
        
            // Log the basket data being passed to the template
            console.log("Basket data being passed:", basket);
            console.log("Total price being passed:", totalPrice);
        
            // Render the EJS template
            res.render('basket', { basket, totalPrice });
            // res.redirect('/');
        });
    }
}

module.exports = new Unprotected;