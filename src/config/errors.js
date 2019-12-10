const errors = {
  notFound: {
    statusCode: 404,
    message: 'This route was not found'
  },
  internalServerError: {
    statusCode: 500,
    message: 'Internal server error'
  },
  cityNotInList: {
    statusCode: 400,
    message: 'City is not in the list'
  },
  emailInvalid: {
    statusCode: 400,
    message: 'E-mail address is invalid'
  },
  incompleteFields: {
    statusCode: 400,
    message: 'All fields should be completed'
  }
}


module.exports = errors
