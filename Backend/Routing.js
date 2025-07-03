import express from 'express'
import {signup} from './controller/signup.js'
import {logger} from './controller/login.js'
export const signuproute=express.Router()  //name export
signuproute.post('/signup',signup)     //end path of signup
export const loginroute=express.Router()
loginroute.post('/login',logger)    //end path of login
