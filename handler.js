'use strict';

const AWS = require('aws-sdk')
const dynamoDB = new AWS.DynamoDB.DocumentClient()
const QUOTES_TABLE_NAME = process.env.quotes_table

module.exports.hello = async event => {

  const quote = await getQuoteService()
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: quote,
        foo: process.env.foo,
      },
      null,
      2
    ),
  };

};

const quotesRepository = id => {
  const quote = {
      TableName: QUOTES_TABLE_NAME,
      KeyConditionExpression: '#id = :id',
      ExpressionAttributeNames: {
          '#id' : 'id'
      },
      ExpressionAttributeValues: {
          ':id': id
      }
  }
  console.log(quote)
  return dynamoDB.query(quote).promise()
}

const getQuoteService = async () => {
  const id = Math.floor(Math.random() * Math.floor(5))
  console.log(`About to fetch the quote number ${id}`)
  try {
      console.log('Fetching from the database')
      const quote = await quotesRepository(id)
      console.log('The quote is', quote)
      return quote.Items[0].quote
  } catch (error) {
      console.error(`There was an error with ${id}`, error)
  }
}