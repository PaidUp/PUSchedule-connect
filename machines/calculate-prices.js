module.exports = {


  friendlyName: 'calculate-prices',


  description: 'Calculate prices for a product',


  extendedDescription: 'Calculate prices for a product',


  cacheable: false,


  sync: false,


  inputs: {
    baseUrl : {
      example : 'http://localhost:9006',
      description : 'TDSchedule microservice url.',
      required : true
    },
    token : {
      example : 'secret-word',
      description : 'token for authentication.',
      required : true
    },
    prices :{
      description : 'List of amount to calculate',
      required : true,
      example : [{
        version: 'v2',
        type: "card",
        capAmount: 625,
        description : "some description",
        dateCharge : "some string data description",
        originalPrice : 203,
        stripePercent : 2.9,
        stripeFlat : 0.3,
        stripeAchPercent : 2.9,
        stripeAchFlat : 0.3,
        paidUpFee : 5,
        paidUpFlat : 5,
        discount : 10,
        payProcessing : false,
        payCollecting : true
      }]
    }
  },

  defaultExit: 'success',

  exits: {
    success: {
      friendlyName: 'then',
      description: 'Array with prices calculated',
      example: {
        status: 200,
        body: `some like this: {
          prices: [{
            version: 'v2',
            basePrice: 290,
            description : 'some description',
            dateCharge : 'some date string',
            owedPrice: 343.44,
            discount : 12,
            originalPrice: 300,
            totalFee: 43.44,
            feePaidUp: 4.2,
            feeStripe: 3.6
          }]
        }`
      }
    },

    error: {
      description : 'Some error with his status',
      example : {
        status : 500,
        message: '*'
      }
    }

  },


  fn: function(inputs, exits) {

    var Connector  = require('../api/v1/common/connector');

    var config = {
      url: '/api/v2/calculate/prices',
      baseUrl: inputs.baseUrl,
      method: 'post',
      token : inputs.token//'tdschedule-secret'
    }

    var body = { prices : inputs.prices}

    Connector.request(config, {}, body, function(err, resp){
      if(err){
        return exits.error({
          status: err.status,
          message: err.body
        });
      }else{
        return exits.success({
          status: resp.status,
          body: JSON.stringify(resp.body)
        });
      }
    });


  },



};
