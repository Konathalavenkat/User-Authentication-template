const {PORT,MONGODB_CONNECTION_STRING,GMAIL,GMAIL_PASS,JWT_SECRET} = process.env;

module.exports = {port : PORT,ConnectionURL : MONGODB_CONNECTION_STRING,senderemail : GMAIL, email_password : GMAIL_PASS,JWT_SECRET};