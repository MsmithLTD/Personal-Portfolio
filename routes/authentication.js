const { Router } = require('express');
class Authentication{
    constructor(){
        this.router = Router();
        this._initGet();
    }
    _initGet(){
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
        this.router.get("/menu", (req, res) => {
            res.render('menu');
        });
        this.router.get("/lessons", (req, res) =>{
            res.render('lessons');
        })
        this.router.get('/hampers', (req, res) => {
            res.render('hampers');
        })
        this.router.get("/order", (req, res) => {
            res.render('order');
        });
        this.router.get("/basket", (req, res) => {
            res.render('basket');
        });
    }
}
module.exports = new Authentication;