import React, { useState } from 'react';
import dbConnect from "../../../config/dbConnect";
import Project from '../../../models/Project';
import {verify} from 'jsonwebtoken';
import {secret} from "../secret";
import {parseCookies} from "../../../config/cookieHelper"
// import {withCookies, Cookies} from "react-cookie";
const {send} = require('micro');
import {useCookies,withCookies, Cookies} from 'react-cookie';

dbConnect();

const handleErrors = fn => async (req, res) => {
    try {
        console.log("Cookie--->");
        console.log('react-cookie------>');
        const jwtAuthData = parseCookies(req);
        const token = jwtAuthData.tokenData;
        console.log('User valid Token Data : ', token);

        verify(token, secret, async function (err, decoded) {
            if (!err && decoded) {
                return fn(req, res);
            }
            res.status(401).json({message: 'Sorry you are not authenticated'});
        });
    } catch (err) {
        console.log("error occurred");
        send(res, 500, "error occurred");
    }
}


export default handleErrors(async (req, res) => {
    const {method} = req;
    const currentPage = req.query.page || 1;
    const perPage = 2;
    const searchValue = req.query.search;

    // const jwtAuthData = parseCookies(req);
    // console.log(jwtAuthData.tokenData);

    switch (method) {
        case 'GET':
            if (searchValue) {
                try {
                    const projects = await Project.find({name: searchValue});
                    const TotalProject = await Project.find().countDocuments();

                    res.status(200).json({
                        success: true,
                        currentPage: currentPage,
                        maxPage: Math.ceil(TotalProject / perPage),
                        data: projects
                    })
                } catch (error) {
                    res.status(400).json({success: false});
                }
            } else {
                try {
                    const projects = await Project.find({}).skip((currentPage - 1) * perPage).limit(perPage);
                    const TotalProject = await Project.find().countDocuments();
                    res.status(200).json({
                        success: true,
                        currentPage: currentPage,
                        maxPage: Math.ceil(TotalProject / perPage),
                        data: projects
                    })
                } catch (error) {
                    res.status(400).json({success: false});
                }
            }
            break;

        case 'POST':
            try {
                const project = await Project.create(req.body);
                res.status(201).json({success: true, data: project})
            } catch (error) {
                res.status(400).json({success: false});
            }
            break;

        default:
            res.status(400).json({success: false});
            break;
    }
});