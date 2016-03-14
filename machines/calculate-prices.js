module.exports = {


  friendlyName: 'calculate-prices',


  description: 'Calculate prices for a product',


  extendedDescription: 'Calculate prices for a product',


  cacheable: false,


  sync: false,


  inputs: {
    baseUrl : {
      example : 'http://localhost:9006',
      description : 'Price base for calculate owed price.',
      required : true
    },
    token : {
      example : 'secret-word',
      description : 'Price base for calculate owed price.',
      required : true
    },
    prices :{
      example : [{
        description : "some description",
        dateCharge : "some string data description",
        originalPrice : 203,
        stripePercent : 2.9,
        stripeFlat : 0.3,
        paidUpFee : 5,
        discount : 10,
        payProcessing : false,
        payCollecting : true
      }],
      description : 'List of amount to calculate',
      required : true
    }
  },

  defaultExit: 'success',

  exits: {

    success: {
      status: 201,
      body: [{
        description : 'some description',
        dataCharge : 'some date string',
        owedPrice: 343.44,
        discount : 12
      }]
    },
    error: {
      status : 500,
      message: '*'
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
        return exits.error(err);
      }else{
        return exits.success(resp);
      }
    });


  },



};
