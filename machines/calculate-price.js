module.exports = {


  friendlyName: 'calculate-price',


  description: 'Calculate price for a product',


  extendedDescription: 'Calculate price for a product',


  cacheable: false,


  sync: false,


  inputs: {
    baseUrl : {
      example : 'http://localhost:9006',
      description : 'Url TDSchedule microservice..',
      required : true
    },
    token : {
      example : 'secret-word',
      description : 'secret word for autenticate microservice.',
      required : true
    },
    version : {
      example : 'v2',
      description : 'version of calculations.',
      required : true
    },
    type: {
      example: 'bank',
      description: 'Type of entity.',
      required: false
    },
    capAmount: {
      example: 456,
      description: 'Amount limit for choose a kind of calculation.',
      required: false
    },
    originalPrice : {
      example : 200.23,
      description : 'Price base for calculate owed price.',
      required : true
    },
    stripePercent : {
      example : 2.9,
      description : 'Percentage for calculate stripe fee.',
      required : true
    },
    stripeFlat : {
      example : 0.30,
      description : 'Amount base to calcualte stripe fee.',
      required : true
    },
    paidUpFee : {
      example : 5,
      description : 'Percentage to calculate Paid Up Fee.',
      required : true
    },
    discount : {
      example : 20,
      description : 'Percentage to discount at original price',
      required : true
    }

    ,
    payProcessing : {
      example : false,
      description : 'This parameter define if user pay stripe processing',
      required : true
    },
    payCollecting : {
      example : true,
      description : 'This parameter define if user pay PadUp processing',
      required : true
    }

  },

  defaultExit: 'success',

  exits: {

    success: {
      friendlyName: 'then',
      description : 'Object with status and price calculated',
      example: {
        status: 200,
        body: `some like this: {
          version: 'v2',
          basePrice: 290,
          originalPrice: 300,
          totalFee: 34,
          feePaidUp: 4.2,
          feeStripe: 3.6,
          owedPrice: 343.44,
          discount : 12
        }`
      }
    },
    error: {
      description: 'Some error with his status',
      example: {
        status : 500,
        message: '*'
      }
    }

  },

  fn: function(inputs, exits) {

    var Connector  = require('../api/v1/common/connector');

    var config = {
      url: '/api/v2/calculate/price',
      baseUrl: inputs.baseUrl,
      method: 'post',
      token : inputs.token//'tdschedule-secret'
    }

    var body = {
      version: inputs.version,
      type: inputs.type,
      capAmount: inputs.capAmount,
      originalPrice: inputs.originalPrice,
      stripePercent: inputs.stripePercent,
      stripeFlat: inputs.stripeFlat,
      paidUpFee: inputs.paidUpFee,
      discount: inputs.discount,
      payProcessing: inputs.payProcessing,
      payCollecting: inputs.payCollecting
    }

    Connector.request(config, {}, body, function(err, resp){
      if(err){
        return exits.error(err);
      }else{
        resp.body = JSON.stringify(resp.body);
        return exits.success(resp);
      }
    });
  },
};
