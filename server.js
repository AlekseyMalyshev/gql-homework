'use strict';

import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import GraphQLHTTP from "express-graphql";

let app = express();

import schoolGraphQLSchema from "./data/schema";

app.use(morgan('combined'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static('public'));
app.use("/graphql", GraphQLHTTP({
  schema: schoolGraphQLSchema,
  graphiql: true
}));

let port = process.env.PORT || 3000;
let listener = app.listen(port);

console.log('express in listening on port: ' + port);
