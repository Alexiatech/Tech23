function sum() {​
    var args = arguments​
    var total = 0​
    var index = -1​
  
    while (++index < args.length) {​
      total += args[index]​
    }​
  
    return total​
  }​

  module.exports = sum;