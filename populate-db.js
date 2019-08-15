const AWS = require('aws-sdk')
const dynamoDB = new AWS.DynamoDB.DocumentClient({region: 'us-east-1'})
const TableName = 'quotes-dev'

const create = params => {
    return dynamoDB.put(params).promise()
}

const quotes = async () => {
    const quote1 = {
        TableName,
        Item: {
            id: 1,
            quote: `Don't worry about what anybody else is going to do. The best way to
            predict the future is to invent it.
            -- Alan Kay`
        }
    }

    const quote2 = {
        TableName, 
        Item: {
            id: 2,
            quote: `Keep away from people who try to belittle your ambitions. Small people
            always do that, but the really great make you feel that you, too, can
            become great.
            -- Mark Twain`
        }
    }

    const quote3 = {
        TableName,
        Item: {
            id: 3,
            quote: `Since programmers create programs out of nothing, imagination is our
            only limitation. Thus, in the world of programming, the hero is the one
            who has great vision. Paul Graham is one of our contemporary heroes. He
            has the ability to embrace the vision, and to express it plainly. His
            works are my favorites, especially the ones describing language design.
            He explains secrets of programming, languages, and human nature that can
            only be learned from the hacker experience. This book shows you his
            great vision, and tells you the truth about the nature of hacking.
            -- Yukihiro "Matz" Matsumoto, creator of Ruby`
        }
    }

    const quote4 = {
        TableName,
        Item: {
            id: 4,
            quote: `To follow the path:
            look to the master,
            follow the master,
            walk with the master,
            see through the master,
            become the master.
        -- Modern zen Poem`
        }
    }

    const quote5 = {
        TableName,
        Item: {
            id: 5,
            quote: `It is said that the real winner is the one who lives in today but able
            to see tomorrow.
            -- Juan Meng, Reviewing "The future of ideas" by Lawrence Lessig`
        }
    }
    
    const quotes = [quote1, quote2, quote3, quote4, quote5]
    console.log(`About to add a total of ${quotes.length}`)
    const promises = quotes.map(quote => create(quote))
    try {
        await Promise.all(promises)
        console.log(`Total of ${quotes.length} were added`)
    } catch (error) {
        console.error('There was an error while adding the quotes', error)
    }
}

// quotes()

const quotesRepository = id => {
    const quote = {
        TableName,
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
  
  const getQuote = async () => {
    const id = Math.floor(Math.random() * Math.floor(5))
    console.log(`About to fetch the quote number ${id}`)
    try {
        console.log('Fetching from the database')
        const quote = await quotesRepository(id)
        console.log('The quote is', quote)
        return quote
    } catch (error) {
        console.error(`There was an error with ${id}`, error)
    }
  }

  getQuote()