'use strict'

exports.handler = async (event, context) => {
  console.log('Event: ', event)
  console.log('Context: ', context)
  
  return {
      result: 'Hello Udacity!'
  }
};
