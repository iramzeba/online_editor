const mongoose = require('../config/config');

var userSchema = mongoose.Schema({
    

    lang: {
        type: String,
        required: 'Kindly enter the select '
      },
      Created_date: {
        type: Date,
        default: Date.now
      },
      code: {
        type: String,
        
      },
      input: {
        type: String,
        
      },
      output: {
        type: String,
        
      },
      error: {
        type: String,
        
      }
});

var compiler = mongoose.model('compiler', userSchema);
module.exports = compiler;