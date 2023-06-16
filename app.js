
function doesSourceContainString(folderName) {
    var fileElements = document.getElementsByTagName('script'); 
        
    for (var i = 0; i < fileElements.length; i++) {
      var src = fileElements[i].getAttribute('src');	
      if (src && src.includes(folderName)) {
        console.log('contains folder name!!!!!!!!!!   ' + src);
        return true;
      }
    }
}

function runUntilTrue(iteration = 0) {
    if (iteration >= 10) {
      // Stop the loop after 10 iterations
      console.log("Loop stopped after 10 iterations.");
      return;
    }
  
    if (doesSourceContainString('Xs7ZDubYI') && doesSourceContainString('EakuIXnu5V')) {
      // Check your condition here and return true if it is met
      console.log("Condition met!");
      return;
    }
  
    console.log("Iteration:", iteration);
    setTimeout(() => {
      runUntilTrue(iteration + 1); // Run the function recursively with an incremented iteration
    }, 2000);
  }
  
  // Usage example:
  runUntilTrue();


  function outerFunction() {
    return new Promise((resolve, reject) => {
      // Inner function
      function innerFunction() {
        // Perform some asynchronous operation using fetch API
        fetch('https://api.example.com/data')
          .then(response => {
            if (response.ok) {
              // If the response is successful, parse the data and resolve the promise
              return response.json();
            } else {
              // If the response is not successful, reject the promise with an error
              throw new Error('Error: ' + response.status);
            }
          })
          .then(data => {
            // Resolve the promise with the desired result
            resolve(data);
          })
          .catch(error => {
            // Reject the promise with the encountered error
            reject(error);
          });
      }
  
      innerFunction();
    });
  }
  
  // Usage example:
  outerFunction()
    .then(result => {
      console.log("Result from outer function:", result);
    })
    .catch(error => {
      console.error("Error occurred:", error);
    });

  